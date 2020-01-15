var https = require('https');                              //HTTPS
var async = require('async');                              //Syncronize
var gm    = require('gm').subClass({ imageMagick: true }); //Image processing
var aws   = require('aws-sdk');                            //AWS SDK

/* LINE API */
var endpointHost = 'trialbot-api.line.me';  //End Point(Fixed value)
var headers      = {
  'Content-Type':                 'application/json; charset=UTF-8',  //Fixed value
  'X-Line-ChannelID':             'YOUR_CHANNEL_ID',                  //Your channel ID
  'X-Line-ChannelSecret':         'YOUR_CHANNEL_SECRET',              //Your channel secret
  'X-Line-Trusted-User-With-ACL': 'u5b8d5cd3e8f9baf9d7efe0692de87e75' //Fixed value
};

/* AWS SDK */
var s3     = new aws.S3({ apiVersion: '2006-03-01',     //Fixed value
                          region:     'ap-northeast-1'  //Your region
});
var bucket = 'YOUR_BUCKET_NAME';                        //Your bucket name
var s3Url  = 'https://s3-ap-northeast-1.amazonaws.com/' + bucket + '/';

/* Other */
var extension = '.jpg';         //Image extention


function sendTextTo(mid, text){
  var options = {
    hostname: endpointHost,
    path:     '/v1/events',
    headers:  headers,
    method:   'POST'
  };
  var req = https.request(options, function(res){
    res.on('data', function(chunk){
    }).on('error', function(err){
        console.log(err);
    }).on('end', function(){            //call when no more date in response
        console.log('finish sending text message')
    });
  });
  var body = JSON.stringify({
    to:        [mid],                   //NOTE: to parameter require array of mids
    toChannel: 1383378250,              //Fixed value
    eventType: "138311608800106203",    //Fixed value
    content: {
      contentType: 1,       //Fixed value if send text
      toType:      1,       //Fiexd value if send text
      text:        text
    }
  });

  req.write(body);
  req.end();
}

function retriveImageFrom(contentId, callback){
  var options = {
    hostname: endpointHost,
    path:     '/v1/bot/message/' + contentId + '/content',
    headers:  headers,
    method:   'GET'
  };
  var req = https.request(options, function(res){
    var data = [];
    res.on('data', function(chunk){
      //image data dividing it in to multiple request
      data.push(new Buffer(chunk));
    }).on('error', function(err){
      console.log(err);
    }).on('end', function(){
      console.log('finish to retrive image')
      img = Buffer.concat(data);
      callback(null, img);
    });
  });

  req.end();
}

function saveImageToS3(img, name, callback){
  var params = {
    Bucket: bucket,
    Key:    name,
    ACL:    'public-read',
    Body:   img
  };
  s3.putObject(params, function(err, data){
    if(err){
      callback("e", "");
    } else {
      callback(null, s3Url + name);
    }
  });
}

function sendImageTo(mid, originalUrl, previewUrl){
  var options = {
    hostname: endpointHost,
    path:     '/v1/events',
    headers:  headers,
    method:   'POST'
  };
  var req = https.request(options, function(res){
    res.on('data', function(chunk){
    }).on('error', function(err){
      console.log(err);
    }).on('end', function(){            //call when no more date in response
      console.log('finish sending image');
    });
  });
  var body = JSON.stringify({
    to:        [mid],
    toChannel: 1383378250,            //Fixed value
    eventType: "138311608800106203",  //Fiexd value
    content: {
      contentType: 2,     //Fiexed value if send image
      toType:      2,     //Fiexed value if send image
      originalContentUrl: originalUrl,
      previewImageUrl:    previewUrl
    }
  });

  req.write(body);
  req.end();
}

exports.lambdaHandler = function(event, context){
  // Retrieve each message. max=100
  event.result.forEach( function(message, index){
    console.log(JSON.stringify(message));
    var mid = message.content.from;
    switch(message.content.contentType){
      case 1:   // Text Message
        sendTextTo(mid, '画像を送ってね');
        break;
      case 2:   // Image Message
        sendTextTo(mid, 'ちょっとまってね');
        async.waterfall([
          function(callback){
            retriveImageFrom(message.content.id, callback);
          },
          function(img, callback){
            //convert image
            gm(img).modulate(100,0).edge(7).toBuffer('jpg',function(err, buf){
                if(err){
                  console.log(err);
                }
                callback(null, buf);
            });
          },
          function(img, callback){
            //save converted image and its thumbnail to S3 bucket
            async.parallel({
              original: function(callback){
                saveImageToS3(img, mid + extension, callback);
              },
              preview: function(callback){
                gm(img).resize(240).toBuffer('jpg',function(err,buf){
                  saveImageToS3(buf, mid + '_thumbnail' + extension, callback);
                });
              }
            }, function(err, result){
              if(err){
                console.log(err);
              } else {
                callback(null,
                         result.original,
                         result.preview);
              }
            });
          },
          function(originalUrl, previewUrl, callback){
            //send converted image
            sendImageTo(mid, originalUrl, previewUrl);
          }
        ], function(err, result){
          if(err){
            console.log(err);
          }
        });
        break;
      default:  // Other Messages
        sendTextTo(mid, '画像を送ってね');
        break;
    }
  });
};