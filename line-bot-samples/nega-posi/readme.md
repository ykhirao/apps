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

line-bot-sdk-nodejsドキュメント
https://line.github.io/line-bot-sdk-nodejs/

版画風加工
https://qiita.com/akihito_nagai/items/f284ef495da380f368cc

https://qiita.com/matsubara0507/items/04ab3c2197aa5f68e499
https://qiita.com/Hirosaji/items/4c136c13660bb1217662
