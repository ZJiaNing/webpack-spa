/*
* webpack基本配置文件
* 单单使用这份文件可以完成的是：打包，热加载，css文件抽离——混在一起了
*/

// http://acgtofe.com/posts/2016/02/full-live-reload-for-express-with-webpack

var webpack = require('webpack')
var path = require('path')

// 使用这个插件就把css从js中独立抽离出来
var ExtractTextPlugin = require("extract-text-webpack-plugin");

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
      // {
      //   test: /\.css$/,
      //   // loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      //   loader: ['style-loader', 'css-loader']
      // },
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
      title: 'Hello, world&&&',
      filename: 'index.html',   // 渲染输出html文件名,路径相对于 output.path 的值
      template: path.resolve(__dirname, '../src/index.html'),   // 渲染输出html文件名,路径相对于 output.path 的值
      inject: true
    }),
    new ExtractTextPlugin("[name].css")     // 如果要有路径配置的话，直接在引号中写就好了
  ],
  devServer: {
    inline: true,
    hot: true   
  }
}


/*
* CAUTION 1
* 用了extract-text-webpack-plugin之后
* 更新css/html不能同步刷新浏览器，更新js则能同步刷新浏览器
* 官方建议开发环境下关闭 ExtractTextPlugin
* 开发环境下不需要考虑加载速度及请求数量（本地服务器），使用 ExtractTextPlugin 插件意义不大
*/

/*
* CAUTION 2
* HotModuleReplacementPlugin
* 为我们的webpack-dev-server开启HMR模式只需要在命令行中添加-–hot，
* 则会将HotModuleReplacementPlugin这个插件添加到webpack的配置中去，所以你配置中就不用再加了
* 反之，不加--hot，则在plugins中加上new webpack.HotModuleReplacementPlugin()即可
*/

/*
* CAUTION 3
* --hot      热加载，代码修改完后自动刷新
* --inline   刷新后的代码自动注入到打包后的文件中
* --progress 显示打包进度
*/

/*
* CAUTION 4
* webpack-dev-middleware
* webpack-hot-middleware
* 暂时只找到了这个说明https://segmentfault.com/a/1190000005614604， 回头去"外面"找找看吧
*/
