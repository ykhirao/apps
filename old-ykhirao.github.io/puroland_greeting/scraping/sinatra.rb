require 'open-uri'
require 'nokogiri'
require 'robotex'
require 'sqlite3'

day = Date.new(2015, 1, 1) # todayから-1していく
today = Date.new(2015, 12, 4)
db1 = SQLite3::Database.new('puroland.db')
db2 = SQLite3::Database.new('puroland.db')


html_view = '<div class="center"><h1>Puroland Monthly Greeting</h1></div>'

1.times do
	url = 'http://www.puroland.jp/schedule/greeting/?date='
    d = today.strftime("%Y%m%d").to_s
	p url += d
	
	# robotexはクロールの可否を確認するライブラリ
	robotex = Robotex.new
	p robotex.allowed?(url)

	# user_agentの偽装
	user_agent = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.63 Safari/537.36'
	charset = nil
	html = open(url, "User-Agent" => user_agent) do |f|
	  charset = f.charset
	  f.read
	end

	#nokogiriによる構造理解
	doc = Nokogiri::HTML.parse(html, nil, charset)
	
	p date = doc.css('#datingBlock > div.dateBlock > div > h2').text #4月1日(金)
	html_view << '<div class="center"><a class="btn btn-primary">' + date + '</a></div>'

	# 2015/12/5 ~ 2016
	# html_view << '<div class="container"><ul>'
	# doc.css('#pageTop > article > div.keyColorBG > div.foundationColorBG > div.characterList > ul > li > a').each { |item|
	#   name = item.css("p.charaName").text
	#   link = item.css("p.charaImg > img").attribute("src")
	#   html_view << '<li><img src="' + link + '" alt="' + name + '"></p></li>'
	# }

	# 12/4以前
	html_view << '<div class="container"><ul>'
	doc.css('#pageTop > article > div > div.foundationColorBG > div > ul > li > a').each { |item|
	  name = item.css("p.charaName").text
	  link = item.css("p.charaImg > img").attribute("src")
	  html_view << '<li><img src="' + link + '" alt="' + name + '"></p></li>'
	}
	

	html_view << '</ul></div>'

    break if d == day.to_s
    today -= 1
end

puts html_view


