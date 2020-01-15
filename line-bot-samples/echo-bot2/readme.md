# line echo bot

## ローカル開発

```
node index.js
ngrok http 1234
```

set `xxxx.ngrok.io/webhook` in https://developers.line.biz/console/

## デプロイ

https://cloud.google.com/functions/docs/deploying/filesystem?hl=ja

### 初回
```
gcloud functions deploy echo-bot2 --runtime nodejs10 --trigger-http --entry-point app
```

### 二回目
```
gcloud functions deploy echo-bot2
```

## 参考
https://qiita.com/matsubara0507/items/04ab3c2197aa5f68e499
