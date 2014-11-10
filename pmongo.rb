require 'mongo'

module PMongo
	def use(db_name)
		yield Mongo::MongoClient.new.db(db_name)
	end
end