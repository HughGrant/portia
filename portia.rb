require 'json'
require 'open-uri'

require 'sinatra/base'
require 'sinatra/reloader'
require 'sinatra/json'
require 'mongo'

require_relative 'tables'
require_relative 'utils'

class Portia < Sinatra::Base
	helpers Sinatra::JSON

	configure :development do
		register Sinatra::Reloader
	end

	before do
		# request.body.rewind
		payload = request.body.read
		@payload = JSON.parse payload unless payload.empty?
		@db = Mongo::MongoClient.new.db('yason')
	end

	get '/push_keywords' do
		data = {success: false, message: '未找到'}
		# optimiztion todo
		db = @db['keywords']
		skws = db.distinct('search_keyword')
		weights = skws.map { |w| Utils::weight_search_keyword(w, params['name']) }
		if weights.max != 0
			skw = skws[weights.rindex(weights.max)]
			kws = db.find({search_keyword: skw}).sort('count').limit(3)
			data[:keywords] = []
			data[:success] = true
			kws.each do |kw|
				db.update(kw, {'$inc' => {count: 1}})	
				data[:keywords].push(kw['keyword'])
			end
		end
		json data
	end

	get '/push_img' do 
		open(params['url']) do |img|
			attachment "#{params['name']}.jpg"
			img.read
		end
	end

	# list
	get '/:model' do |model|
		limit = params['limit'].to_i || 30
		page = params['page'].to_i || 1
		skip = limit * page
		json @db[model].find.skip(skip).limit(limit).to_a
	end

	# create
	post '/:model' do |model|
		@db[model].insert @payload
		json @payload
	end

	# update
	post '/:model/:id' do |model, id|
		@payload.delete '_id'
		@payload.delete 'check'
		_id = {'_id' => BSON::ObjectId(id)}
		@db[model].update _id, @payload
		redirect to("/#{model}/#{id}")
	 	# json @db.find_one id
	end

	# count
	get '/:model/count' do |model|
		json :row => @db[model].count
	end

	# table meta info
	get '/:model/meta' do |model|
		json Tables::META[model.to_sym]
	end

	# must define this after meta to avoid match collison
	get '/:model/:id' do |model, id|
		json @db[model].find_one({'_id' => BSON::ObjectId(id)})
	end

	# delete
	delete '/:model/:id' do |model, id|
		json @db[model].remove '_id' => BSON::ObjectId(id)
	end

	run! if app_file == $0	
end
