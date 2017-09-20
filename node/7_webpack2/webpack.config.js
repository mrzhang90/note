const path =require('path');
// var webpack=require('webpack');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports={
	entry:{
		'index':'./assets/scripts/index.es'
	},
	output:{
		path:path.join(__dirname,'./assets/'),
		publicPath:'./',
		filename:"script/[name]-[hash].js"
	},
	plugins: [
		new HtmlWebpackPlugin({
			'filename':'index.html',
			'template':__dirname+'/src/index.html'
		})
	],
	module:{
		rules:[{
			test: /(\.jsx|\.js)$/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: [
                        "es2015", "stage-0"
                    ]
                }
            },
            
		},{
			test: /\.less$/,
			use:ExtractTextPlugin.extract({
	          fallback: "style-loader",
	          use: [{
	          	loader:'css-loader'
	          },{
	          	loader:'less-loader'
	          }]
	        })
		}]
	}
}