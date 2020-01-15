html = File.read("index.html")

html_view =""
arr_link, arr_name, arr_birth = [],[],[]

html.scan(%r{<p class="carouselTit">\s{22}(.*?)\s{22}<br />(.*?)\s{20}</p>\s{19}</div>}) do |name, birth|
		arr_name << name
		arr_birth << birth
end

html.scan(%r{<p class="carouselImg"><img src="(.*?)"}) do|item|
	arr_link << item
end

n = arr_link.size

n.times do |i|
	text = '<li><img src="' + arr_link[i].to_s.slice(2..-3) + '" class="radius">' + '<figcaption><span>' + arr_name[i].to_s + '<br>' + arr_birth[i].to_s + '</span></figcaption></li>'
	html_view << text
end

puts html_view