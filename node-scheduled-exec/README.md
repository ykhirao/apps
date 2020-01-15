# node-scheduled-exec

## env

```shell
cp .env.example .env

# 開発環境での.env読み込み
npm install --save dotenv

# heroku環境での.env読み込み
heroku plugins:install heroku-config

# .envのpush/pull
heroku config:push
heroku config:pull
```

```js
// usage
require('dotenv').config();
console.log(process.env.SLACK_POST_TOKEN)
```

## 操作

```shell

# macでheroku-cliをいれる
brew tap heroku/brew && brew install heroku

# アドオンの確認
heroku addons --all

# アドオンのヘルプ
heroku addons --help

# スケジューラーをWebで開く
heroku addons:open SCHEDULER

# アドオンの削除
heroku addons:destroy SCHEDULER --app node-scheduled-exec --confirm node-scheduled-exec

# Procfileと連動 / スケジューラーに使う / workerのdynoを起動
heroku scale worker=0
heroku scale worker=1

# webのdynoを落とす
heroku scale web=0
Scaling dynos... done, now running web at 0:Free

# dynoがいくつ使われているか確認
heroku ps:scale

# ログ確認
heroku logs
heroku logs --tail

# herokuでのスクリプト発火 @ local
heroku local:run npm run job-hello

# herokuでのスクリプト発火 @ 本番
heroku run npm run job-hello

# app to run command against となって毎回 --app を入力しないといけない場合
git remote add heroku git@heroku.com:node-scheduled-exec.git
# heroku git:remote --app APPNAME # これでもいけそう。ためしてない。

# リモートのgithub.comとheroku.comが登録されてたらOK
git remote -v

```

## DB操作

```shell
# インストール
# https://elements.heroku.com/addons/heroku-postgresql
heroku addons:create heroku-postgresql:hobby-dev

# 今インストールされているアドオンを確認
heroku addons

# postgresqlの仕様状況とか
heroku pg:info

# heroku にssh
heroku run bash

# ログの確認
heroku logs -t
heroku logs -p postgres -t

# ポスグレの場所
# アプリを立ち上げる
/Applications/Postgres.app

# ポスグレログイン
psql -h localhost

# ユーザーにパスワードをもたせる
yk-# \password yk
Enter new password: local
Enter it again: local

# ユーザーを切り替える
yk-# \c yk
You are now connected to database "yk" as user "yk".

# DBのpush
heroku pg:push yk DATABASE_URL

```

