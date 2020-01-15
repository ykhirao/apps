const GOOGLE_TOKEN = PropertiesService.getScriptProperties().getProperty("GOOGLE");

export default class GoogleService {
  static execOcrApi(blob){
    const requests = [{
      "image": {
        "content": Utilities.base64Encode(blob.getBlob().getBytes())
      }, 
      "features": [
        {
          "type": "TEXT_DETECTION"
        }
      ],
    }];

    try {
      var res = UrlFetchApp.fetch(`https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_TOKEN}`, {
        method : 'post',
        contentType: 'application/json', 
        payload: JSON.stringify({ requests })
      });
    } catch(e) {
      return "OCR処理に失敗しました。";
    }
  
    const textAnnotations = JSON.parse(res.getContentText()).responses[0].textAnnotations;

    if(textAnnotations === undefined){
      return "OCRでデータ解析ができませんでした。";
    }
  
    return textAnnotations[0].description
  }

  static uploadImageAndGetUrl(imageBlob) {
    const image = DriveApp.createFile(imageBlob);
    DriveApp.getFolderById('1uBW7WNXE7J_g-rW7hkP7YPiZFeTb0Cyl').addFile(image); 
    DriveApp.getRootFolder().removeFile(image)

    return `https://drive.google.com/uc?export=download&id=${image.getId()}`
  }

  static uploadCanvasImage() {
    const imageBlob = Maps.newStaticMap().setCenter('東京タワー').getBlob();
    const image = DriveApp.createFile(imageBlob);
    DriveApp.getFolderById('1uBW7WNXE7J_g-rW7hkP7YPiZFeTb0Cyl').addFile(image); 
    DriveApp.getRootFolder().removeFile(image)
  }
}
