require('dotenv').config();
var https = require('https');
var fs = require("fs");
const line = require('@line/bot-sdk');
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};
const client = new line.Client(config);
const middleware = line.middleware(config);

function writeRequestLog(obj) {
  if (process.env.ENVIRONMENT !== 'local') return;

  try {
    fs.appendFileSync("request.log", JSON.stringify(obj) + '\n');
    console.log('write log end');
  } catch(e) {
    console.log('write log error: ');
    console.log(e);
  }
}

function retriveImageFrom(contentId){
  const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
  };

  var options = {
    hostname: 'api.line.me',
    path:     '/v2/bot/message/' + contentId + '/content',
    headers:  headers,
    method:   'GET'
  };

  var req = https.request(options, function(res){
    var data = [];
    res.on('data', function(chunk){
      //image data dividing it in to multiple request
      data.push(new Buffer.from(chunk));
    }).on('error', function(err){
      console.log(err);
    }).on('end', function(){
      console.log('finish to retrive image')
      img = Buffer.concat(data);
      fs.writeFileSync(`./assets/nefry.jpg`, img, 'base64');
    });
  });

  req.end();
  // return img;
}

async function handleImage(id) {
  // const res = await client.getMessageContent(id)
  // Utilities.base64Encode(blob.getBlob().getBytes()
  // console.dir(res)
  // writeRequestLog(res)
  // var data = [];

  // res.on('data', function(chunk){
  //   //image data dividing it in to multiple request
  //   data.push(new Buffer.from(chunk));
  // })
  // console.log(data)

  retriveImageFrom(id);
  console.log(`done`);
}

function handleText(event) {
  const echo = { type: 'text', text: event.message.text };

  return client.replyMessage(event.replyToken, echo);
}

function handleEvent(event) {
  writeRequestLog(event)

  if (event.type !== 'message' || event.message.type !== 'text') {
    handleImage(event.message.id);
  } else {
    handleText(event)
  }

  return Promise.resolve(null);
}

async function handlePost(req, res) {
  const result = await Promise.all(req.body.events.map(handleEvent))
  res.json(result)
}

module.exports = {
  handlePost,
  middleware,
};
