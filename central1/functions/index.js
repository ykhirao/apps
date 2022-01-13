const functions = require("firebase-functions");
const express = require("express");
const app = express();

console.log("FIRE!!!!!!!!!!!!");

app.get("/foo", (req, res) => {
  const date = new Date();
  const hours = (date.getHours() % 12) + 1; // London is UTC + 1hr;
  res.send(`
    <!doctype html>
    <head>
      <title>Time</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <p>In London, the clock strikes:
        <span id="bongs">${"BONG ".repeat(hours)}</span></p>
      <button onClick="refresh(this)">Refresh</button>
    </body>
  </html>`);
});

app.get("/s/:id", (req, res) => {
  res.send(req.params.id);
});

exports.app = functions.https.onRequest(app);
