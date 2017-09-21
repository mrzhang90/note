const path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        'index': './assets/scripts/index.es'
    },
    output: {
        path: path.join(__dirname, './assets/'),
        //上线后把./换成www地址
        publicPath: './', //资源生成后，会在路径的后面加这个./
        filename: "scripts/[name]-build.js"
    },
    plugins: [
        new ExtractTextPlugin("styles/[name].css"),
        new webpack.optimize.CommonsChunkPlugin({ //生成共有的chuns
            name: 'common',
            filename: 'scripts/[name].js',
            minChunks: 2 //如果有2个以上的文件，引用同样相同的一个js代码
        }), new HtmlWebpackPlugin({
            filename: 'index.html', //以output地址为基准
            template: path.join(__dirname, "/index.html"), //new 一个这个插件的实例，并传入相关的参数
            inject: true
        }), 
        new webpack.optimize.ModuleConcatenationPlugin(),//作用域提升，把一样的代码合并一起，减小转换后的es5代码
        new webpack.optimize.UglifyJsPlugin({//压缩，同时会去掉用不到的代码
        	compress:{
        		warnings:true//警告
        	},
        	output:{
        		comments:false//注释
        	},
        	sourceMap:false
        })
    ],
    externals:{
    	jquery:'window.$'
    },
    module: {
        rules: [{
            test: /(\.es)$/,
            use: [{
                loader: "babel-loader",
                options: {
                    presets: [
                        ["es2015",{
                        	'modules':false//干掉babel的模块化机制，这样webpack的压缩就可以去掉无用代码
                        }], "stage-0"
                    ]
                }
            }]
        }, {
            test: /\.less$/i,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader", //下面所有都失败，那么就走fallback
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            })
        }]
    }
}