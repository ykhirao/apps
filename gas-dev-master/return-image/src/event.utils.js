import GoogleService from './google.service';
import LineService from './line.service';

export default class EventUtils {
  static execOcrAndGetText(event){
    if (event.message.type === 'image'){
      const blob = LineService.getContentById(event.message.id);
      const text = GoogleService.execOcrApi(blob);
      return text;
    } else {
      return "OCRするには画像を送ってね！";
    }
  }
}