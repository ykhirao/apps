'use strict';

require('dotenv').config();
const port = process.env.PORT || 5555;

const app = require('express')();
const post = require('./post');

app.get('/', (req, res) => res.send('Hello World!'))
app.post('/webhook', post.middleware, post.handlePost);

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});

module.exports = {
  app
};
