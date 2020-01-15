require('dotenv').config();

const qs = require('qs');
const axios = require('axios');
const url = 'https://slack.com/api/chat.postMessage'

function post(msg) {
  const data = {
    channel: "#post",
    text: msg,
    as_user: true
  };
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', 'Authorization': `Bearer ${process.env.SLACK_POST_TOKEN}` },
    data: qs.stringify(data),
    url,
  };
  axios(options)
    .then(function (response) {
      console.log(response.data.ok);
    })
    .catch(function (error) {
      console.log(error);
    });
}

module.exports.post = post;
