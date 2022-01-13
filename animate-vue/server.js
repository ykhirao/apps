// サンプル
var express = require('express')
var app = express()
var multer = require('multer')

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.post(
  '/upload',
  multer({ dest: '/tmp/samplefup/' }).single('file'),
  function(req, res) {
    // multerが/tmp/samplefup/配下にファイルを作成

    // req.file.pathでmulterが作成したファイルのパスを取得可能
    console.log(req.file)
    console.log(req.file.path, req.file.originalname)
    res.end('upload!')
  }
)

var server = app.listen(8081, function() {
  console.log('listening at port %s', server.address().port)
})
