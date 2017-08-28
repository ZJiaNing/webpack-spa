// 可以看下这边文章
// http://acgtofe.com/posts/2016/02/full-live-reload-for-express-with-webpack

var webpack = require('webpack')
var path = require('path')

// 使用这个插件就把css从js中独立抽离出来
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//
var HtmlWebpackPlugin = require('html-webpack-plugin');

// CAUTION: __dirname是webpack所在的位置的路径
// 在此情况下，即为D:\Project\webpack-spa\build
// console.log(__dirname);
// 下面输出即为： D:\Project\webpack-spa\src\index.html
var aa = path.resolve(__dirname, '../src/index.html');

module.exports = {
  // entry: path.resolve(__dirname, './src/main.js'),  // Q: 什么时候使用resolve呢？
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../output'),
    filename: "bundle.[hash:5].js"    // 打包后输出文件的文件名
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',   // 不知道为什么index.js的编译在没有加这个loader的时候也可以运行正常，并且是已经处于编译完成的状态了
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hello, world&&&',
      filename: 'index.html',   // 渲染输出html文件名,路径相对于 output.path 的值
      template: path.resolve(__dirname, '../src/index.html'),   // 渲染输出html文件名,路径相对于 output.path 的值
      inject: true
    }),
    new ExtractTextPlugin("styles.css")
  ],
  devServer: {
    inline: true
  }
}
