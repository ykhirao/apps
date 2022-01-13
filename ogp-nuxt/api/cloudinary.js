var cloudinary = require('cloudinary').v2
require('dotenv').config();
const { cloud_name, api_key, api_secret } = process.env;
const url = "http://res.cloudinary.com/demo/image/upload/sample.jpg"

// console.log(process.env)

cloudinary.uploader.upload(url,
  { cloud_name, api_key, api_secret },
  function (error, result) { console.log(result, error) });
