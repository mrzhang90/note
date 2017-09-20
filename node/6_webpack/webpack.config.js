var webpack=require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
	entry:__dirname+'/src/script/app.js',
	output:{
		path:__dirname + '/build',
		filename:"script/[name]-[hash].js"
	},
	plugins: [
		new HtmlWebpackPlugin({
			'filename':'index.html',
			'template':__dirname+'/src/index.html'
		})
	],
	resolve: {
        extensions: ['', '.js', '.css']
    }
}