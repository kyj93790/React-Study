const path = require('path');

module.exports = {
	name: 'wordrelay-setting',
	mode: 'development', // 실서비스: production
	devtool: 'eval', // 빠르게
	resolve: {
		extension: ['.js', '.jsx']
	},

	entry: {
		app: ['./client.jsx'],
	},	// 입력

	module: {
		rules : [{
			test: /\.jsx?/,	// js파일과 jsx파일에 룰을 적용하겠다는 것(정규표현식)
			loader: 'babel-loader',
			options: {	//babel의 옵셕
				presets: ['@babel/preset-env', '@babel/preset-react'],
				plugins: ['@babel/plugin-proposal-class-properties'],
			}
		}],
	},

	output: {
		// path.join : 경로를 합쳐줌
		path: path.join(__dirname, 'dist'),
		filename: 'app.js'
	},	// 출력
};