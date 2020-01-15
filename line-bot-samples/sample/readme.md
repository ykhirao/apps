# line echo bot

## デプロイ

https://cloud.google.com/functions/docs/deploying/filesystem?hl=ja

### 初回
```
gcloud beta functions deploy echo-bot --stage-bucket line-bot-190627 --trigger-http --entry-point handler --runtime nodejs10 \
--set-env-vars CHANNEL_ACCESS_TOKEN=xxxx \
--set-env-vars CHANNEL_SECRET=xxxx
```

### 二回目
```
gcloud beta functions deploy echo-bot
```

## 参考
https://qiita.com/matsubara0507/items/04ab3c2197aa5f68e499
