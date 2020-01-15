
var CHANNEL_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty("LINE");
var googleToken = PropertiesService.getScriptProperties().getProperty("GOOGLE");

export default function doPost(req) {
  if(!req){
    return
  }
  const event = JSON.parse(req.postData.contents).events[0];

  if (event.message.type === 'image'){
    const blob = getLineContent(event.message.id);
    const text = execOcrApi(blob);

    sendLineMessage(event.replyToken, text);
  } else {
    sendLineMessage(event.replyToken, "画像を送ってくれたらテキストを返すよ！");
  }
}

//LINEから画像を取ってくる関数
function getLineContent(messageId) {
  var url = 'https://api.line.me/v2/bot/message/' + messageId + '/content';

  //blobに画像を格納
  return UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'get'
  }); 
}

function execOcrApi(blob){
  const payload = {
    method : 'post',
    contentType: 'application/json', 
    payload : JSON.stringify({
      "requests":[
        {
          "image": {
            "content": Utilities.base64Encode(blob.getBlob().getBytes())
          }, 
          "features": [
            {
              "type": "TEXT_DETECTION"
            }
          ],
        }
      ]
    })
  };

  var url = "https://vision.googleapis.com/v1/images:annotate?key=" + googleToken;

  try {
    var res = UrlFetchApp.fetch(url, payload);
  } catch(e) {
    return "OCR処理に失敗しました";
  }

  const textAnnotations = JSON.parse(res.getContentText()).responses[0].textAnnotations;
  if(textAnnotations === undefined){
    return "OCRでデータが取得できませんでした。";
  }

  return textAnnotations[0].description
}

function sendLineMessage(token, message){
  var url = 'https://api.line.me/v2/bot/message/reply';

  UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': token,
      'messages': [{
        'type': 'text',
        'text': message,
      }],
    }),
  }); 
}
