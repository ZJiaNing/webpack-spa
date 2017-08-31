/*
* webpack基本配置文件
*/

// http://acgtofe.com/posts/2016/02/full-live-reload-for-express-with-webpack

const webpack = require('webpack')
const path = require('path')

// 使用这个插件就把css从js中独立抽离出来
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const HtmlWebpackPlugin = require('html-webpack-plugin');

// CAUTION: __dirname是webpack所在的位置的路径
// 在此情况下，即为D:\Project\webpack-spa\build
// console.log(__dirname);
// 下面输出即为： D:\Project\webpack-spa\src\index.html
var aa = path.resolve(__dirname, '../src/index.html');

module.exports = {
  // entry: path.resolve(__dirname, './src/main.js'),  // Q: 什么时候使用resolve呢？
  // entry: './src/main.js',
  entry: {
    main: './src/main.js',
    vendors: ['./src/lib/echarts.simple.min.js']
  },
  output: {
    path: path.resolve(__dirname, '../output'),
    filename: "[name].[hash:5].js",    // 打包后输出文件的文件名
    chunkFilename: "[name]-[id].[hash:5].js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',   // 不知道为什么index.js的编译在没有加这个loader的时候也可以运行正常，并且是已经处于编译完成的状态了
        exclude: /node_modules/
      },
      // {
      //   test: /\.css$/,
      //   loader: ["style-loader", "css-loader"]
      // }
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hello, world',
      filename: 'index.html',                                   // 渲染输出html文件名,路径相对于 output.path 的值
      template: path.resolve(__dirname, '../src/index.html'),   // 渲染输出html文件名,路径相对于 output.path 的值
      inject: true
    })
    // new ExtractTextPlugin("[name].[hash:5].css")             // 如果要有路径配置的话，直接在引号中写就好了
  ]
}


/*
* CAUTION 1
* ExtractTextPlugin 这个插件如果在这个基本配置文件中使用了
* 但是在webpack.config.dev中并没有使用的话，则会报错
* extract-text-webpack-plugin loader is used without the corresponding plugin
* 但是矛盾的是开发环境没有使用这个插件的必要，以及如果用了，则更新css的热加载就无效了
* 暂时不知道要怎么解决？？
*/

/*
* CAUTION 2
* 关于filename的命名
* 如果entry中命名了，那么output中的filename就用[name]代替，
* 不然会出现的错误是multiple assets emit to the filename的错误
*/

/*
* CAUTION 3
* Vendor chunkhash changes when app code changes
*
*/

/*
* CAUTION 4
* 热更新(HMR)不能和[chunkhash]同时使用
* 报错如下: Cannot use [chunkhash] for chunk in '/dist/js/[name]_[chunkhash].js' (use [hash]
*
*/

/*
* Memo 1
* chunkHash VS hash  VS contentHash
* chunkhash也就是根据模块内容计算出的hash值。
* hash则是根据compilation之后，全部的资源计算得出的值
* (compilation对象包含当前模块资源、待编译文件、有改动的文件和监听依赖的所有信息。)
* 可以看下这篇文章： https://zhuanlan.zhihu.com/p/23595975
*
* contentHash是由extract-text-webpack-plugin提供的，顾名思义就是文本文件内容的hash值
*/
