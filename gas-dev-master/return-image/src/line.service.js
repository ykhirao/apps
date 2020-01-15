const CHANNEL_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty("LINE");
const headers = {
  'Content-Type': 'application/json; charset=UTF-8',
  Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
};

export default class LineService {
  static replyMessage(token, message){
    var url = 'https://api.line.me/v2/bot/message/reply';
  
    UrlFetchApp.fetch(url, {
      headers,
      method: 'post',
      payload: JSON.stringify({
        'replyToken': token,
        'messages': [{
          'type': 'text',
          'text': message,
        }],
      }),
    }); 
  }

  static replyImage(token, originalContentUrl, previewImageUrl = undefined){
    if (!previewImageUrl) previewImageUrl = originalContentUrl

    UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', {
      headers,
      method: 'post',
      payload: JSON.stringify({
        'replyToken': token,
        'messages': [{
          type: 'image',
          originalContentUrl,
          previewImageUrl,
        }],
      }),
    }); 
  }

  //LINEから画像を取ってくる関数
  static getContentById(messageId) {
    var url = 'https://api.line.me/v2/bot/message/' + messageId + '/content';

    return UrlFetchApp.fetch(url, {
      headers,
      method: 'get'
    }); 
  }
}
