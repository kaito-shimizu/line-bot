'use strict';

const line = require('@line/bot-sdk');
require('dotenv').config();
const https = require('https')
const fs = require('fs');
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

const config = {
    channelSecret: process.env.channelSecret,
    channelAccessToken: process.env.channelAccessToken
};
const client = new line.Client(config);

app.get('/', (req, res) => res.send('Hello World'));
app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});

// 応答処理
function handleEvent(event) {
  const userInput = event.message.text.toLowerCase();

  let replyText = event.message.text;

  if (userInput.includes('会場')) {
    replyText = 'https://goo.gl/maps/gK7qj2gMdLELtebK8';
  } else  {
    replyText = 'お問い合わせはこちら→XXX-XXXX-XXXX';
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: replyText
  })
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);
