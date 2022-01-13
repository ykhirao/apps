const express = require('express')
const app = express()

app.get("/", function (req, res) {
  var data = {
    text: "こんにちは！"
  };

  res.send('トップページ')
});

app.listen(process.env.PORT || 8080, () => console.log(`App listening on port ${process.env.PORT || 8080}!!`))

// s is share
app.get('/s/:text', function (req, res) {
  console.log(req.params);
  const text = req.params.text ? req.params.text : ""

  res.render("./index.ejs", { text });
})

app.get('*/*', function (req, res) {
  res.redirect("/")
})
