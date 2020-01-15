const path = require('path');
const webpack = require('webpack');

module.exports = {
  pages: {
    index: {
      // 最初に実行されるファイル名
      entry: 'src/main.js',
      // 出力されるファイル名
      filename: 'index.html',
    },
  },

  publicPath: './',
  filenameHashing: true,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
      ]
    },
    output: {
      filename: 'content.js'
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      }
    },
    plugins: [
      new webpack.ProgressPlugin(),
    ]
  }
}
