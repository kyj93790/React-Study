const path = require('path');

module.exports = {
	name: 'wordrelay-setting',
	mode: 'development', // 실서비스: production
	devtool: 'eval', // 빠르게
	resolve: { // 확장자를 알아서 웹팩이 찾아줌
		extensions: ['.js', '.jsx']
	},

	entry: {
		app: ['./client'],
	},	// 입력

	// entry에 있는 파일 읽고 module을 적용하여 output으로 뺌
	module: {
		rules : [{	// 여러 개의 규칙을 적용할 수 있도록 하는 배열
			// test : 규칙을 적용할 파일들
			test: /\.jsx?/,	// js파일과 jsx파일에 룰을 적용하겠다는 것(정규표현식)
			loader: 'babel-loader', // babel rule을 적용
			options: {	//babel의 옵션
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