import GoogleService from './google.service';
import LineService from './line.service';

export default function doPost(req) {
    if(!req){
      return
    }

    const event = JSON.parse(req.postData.contents).events[0];

    if (event.message.type !== 'image'){
      LineService.replyMessage(event.replyToken, "画像を送ってくれたらテキストを返すよ！");
      return;
    }

    GoogleService.uploadCanvasImage()
    LineService.replyMessage(event.replyToken, "処理が終了したよ。たぶん。");
}
