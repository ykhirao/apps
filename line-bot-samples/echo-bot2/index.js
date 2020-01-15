'use strict';

require('dotenv').config();
const line = require('@line/bot-sdk');
const express = require('express');

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);

const app = express();

app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

app.get('/', (req, res) => res.send('Hello World!'))

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  const echo = { type: 'text', text: event.message.text };

  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 5555;
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});

module.exports = {
  app
};
