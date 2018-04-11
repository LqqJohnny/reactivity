var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require("webpack");
module.exports = {
    // 基础设置
    devtool: 'cheap-source-map',  // 生成  Source Maps  便于调试，会输出详细的错误信息
    entry:  __dirname + "/index.js",//唯一入口文件
    // mode:"development",
    output: {
        path: __dirname + "/dist",//打包后的文件存放的地方
        filename: "js/reactivity.js",//打包后输出文件的文件名
        // publicPath:"http://helloBitchs/",   // 打包之后在自动在引用的地方加前缀
    },
//  配置 server 实时应用修改更新并打包
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//true不跳转  false刷新页面
        port:"5200",
        hot: true,
        inline: true//实时刷新
    },
    //  loader   各种类型的loader 都在这里配置 css js img
    module: {
        loaders: [
            {       // js
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    'presets': ['latest'],
                }
            }
        ]
  },

    //  插件
    plugins: [
        new HtmlWebpackPlugin({                 //  打包后自动生成一个index.html 引用生成的js文件
            template: __dirname + "/public/index.html",// new 一个这个插件的实例，并传入相关的参数
            inject:"body",
            fileName:"index.html",
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}
