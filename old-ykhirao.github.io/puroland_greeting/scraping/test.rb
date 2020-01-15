
require 'open-uri'
require 'nokogiri'
require 'robotex'
require 'sqlite3'

day = Date.new(2016, 4, 9) # todayまで+1していく
today = Date.today #2016-04-12
db1 = SQLite3::Database.new('puroland.db')
db2 = SQLite3::Database.new('puroland.db')

url = 'http://www.puroland.jp/schedule/greeting/?date='

3.times do
    p d = day.strftime("%Y%m%d").to_s
	url += d
	
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

	db1.execute('CREATE TABLE IF NOT EXISTS character_img (date varchar(8),name varchar(20), url varchar(60));')
	
	# 本日の登場キャラクターの名前を配列に入れる
	arr = []
	doc.css('#pageTop > article > div.keyColorBG > div.foundationColorBG > div.characterList > ul > li > a').each { |item|
	  name = item.css("p.charaName").text
	  link = item.css("p.charaImg > img").attribute("src")
	  arr << name
	  db1.execute 'INSERT INTO character_img values ( ?, ?, ? );', ["#{d}", "#{name}", "#{link}"]  

	}

	a = arr.join(" ") #キャラクターの名前をスペースで結合
	date2 = doc.css('#datingBlock > div.dateBlock > div > h2').text #4月1日(金)

	# members -> date, 
	# db = SQLite3::Database.new('puroland.db')
	db2.execute('CREATE TABLE IF NOT EXISTS members (date varchar(50), name varchar(300));')
	db2.execute 'INSERT INTO members values ( ?, ? );', ["#{d}", "#{a}"]  

	# members -> date, 

	

    break if d == today.to_s
    day += 1
end


