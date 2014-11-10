# require 'open-uri'

# require 'nokogiri'

module Utils

	def Utils.weight_search_keyword(word, name)
		ignores = ['machine']
		word = word.downcase
		name = name.downcase

		ignores.each do |w|
			word.gsub!(w, '')
			name.gsub!(w, '')
		end

		if name.include? word
			return 10
		end

		weight = 0
		words = word.split(' ').sort
		names = name.split(' ').sort

		names.each do |name|
			words.each do |word|
				if name == word
					weight += 1
				end
			end
		end

		weight
	end

	# def parsing_product(url)
	# 	p = {}
	# 	doc = Nokogiri::HTML(open(url))
	# 	p[:name] = doc.css('h1.fn').text
	# 	p[:category] = doc.css('.ui-breadcrumb').first['content'].split('>').map(&:strip)
	# 	p[:photos] = [doc.css('.photo.pic.J-pic').first['src']]

	# 	index = 0
	# 	p[:attrs] = []
	# 	attr_v = doc.css('.J-value')
	# 	doc.css('.J-name').each do |k|
	# 		p[:attrs].push [k.text.strip[0..-2], attr_v[index].text.strip]
	# 		index += 1
	# 	end

	# 	p[:consignment_term] = doc.css('td:contains("Packaging Detail:") + td').first.text
	# 	p[:packaging_desc] = doc.css('td:contains("Delivery Detail:") + td').first.text
	# 	p[:summary] = doc.css('p.description').first.text
	# end

end