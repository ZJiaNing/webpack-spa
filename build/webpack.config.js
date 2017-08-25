// 可以看下这边文章
// http://acgtofe.com/posts/2016/02/full-live-reload-for-express-with-webpack

var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// CAUTION: __dirname是webpack所在的位置的路径
// console.log(__dirname);

module.exports = {
  // entry: path.resolve(__dirname, './src/main.js'),
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../output'),
    filename: "bundle.js"//打包后输出文件的文件名
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'   // 不知道为什么index.js的编译在没有加这个loader的时候也可以运行正常，并且是已经处于编译完成的状态了
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      }
    ]
  }
}
