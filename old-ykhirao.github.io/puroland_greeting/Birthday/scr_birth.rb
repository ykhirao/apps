require 'open-uri'
require 'robotex'

html_view = ''

(1..12).each do |i|
	url = 'http://www.puroland.jp/schedule/greeting/?date=2016'
    if i < 10
    	d = "0" + i.to_s
    else
    	d = i.to_s
    end
	p url += (d + "01")
	
	# robotex -> クロールの可否を確認
	robotex = Robotex.new
	p robotex.allowed?(url)

	# user_agentの偽装
	user_agent = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.63 Safari/537.36'
	charset = nil
	html = open(url, "User-Agent" => user_agent) do |f|
	  charset = f.charset
	  f.read
	end
	html_view << '<div class="center month"><span class="birthday_charactor">' + "#{i}" + '月バースデーキャラクター</span></div>'

	# ここから
	html_view << '<div class="row"><ul>'
	arr_link, arr_name, arr_birth = [],[],[]

	# 名前
	html.scan(%r{<p class="carouselTit">\s{20}(.*?)\s{20}<br />}) do |name|
			tmp = name.to_s.gsub(" ", "") 
			arr_name << tmp
	end

	# 誕生日
	html.scan(%r{<br />(\d{1,2}月\d{1,2}日)}) do |birth|
			p birth
			arr_birth << birth
	end

	# リンク
	html.scan(%r{<p class="carouselImg"><img src="(.*?)"}) do|item|
		arr_link << item
	end

	n = arr_link.size

	n.times do |i|
		text = '<li><img src="' + arr_link[i].to_s.slice(2..-3) + '" class="radius">' + '<figcaption><span>' + arr_name[i].to_s.slice(2..-3) + '<br>' + arr_birth[i].to_s.slice(2..-3).to_s + '</span></figcaption></li>'
		html_view << text
	end
	html_view << '</ul></div>'
end

puts html_view


