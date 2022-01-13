require('dotenv').config()

const express = require('express')
const multer = require('multer')
const app = express()
const bodyParser = require('body-parser')
var cloudinary = require('cloudinary').v2
const uuid = require('uuid')
const fs = require('fs')

const { cloud_name, api_key, api_secret } = process.env

app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(express.json({ extended: true, limit: '10mb' }))

app.use(bodyParser())

app.get('/', function(req, res) {
  res.send('HelloWorld')
})

app.post('/images', (req, res) => {
  try {
    var base64Data = req.body.img.replace(/^data:image\/jpeg;base64,/, '')
    const filename = `images/${Math.random()
      .toString(32)
      .substring(2)}.jpg`

    fs.writeFileSync(filename, base64Data, 'base64', function(err) {
      if (err) {
        console.log('エラーが発生しました。' + err)
        throw err
      }
      res.send('書き込み完了')
    })
  } catch (e) {
    res.send('書き込み失敗しました！')
  }
})

app.post('/canvas', function(req, res) {
  const base64 = req.body.base64
  const public_id = `ogp/${uuid.v4()}`
  cloudinary.uploader.upload(
    base64,
    { cloud_name, api_key, api_secret, public_id },
    function(error, result) {
      console.log(result, error)
    }
  )

  res.send('OK')
})

// app.get("/canvas", function (req, res) {
//   console.log('canvas fire');
//   res.send("HelloWorld");
// });

// app.get("/test", function (req, res) {
//   res.json({ message: "test" })
// })

module.exports = {
  path: '/api/',
  handler: app
}
