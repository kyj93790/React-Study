const path = require('path')

module.exports = {
    mode: 'development',
    devtool: 'eval', // 개발 시에는 eval, production일 때는 hidden-source-map
    resolve: {
        extensions: ['.jsx', '.js'],
    },
    entry: {
        app: './client',
    },
    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets : {
                            browsers: ['> 5% in KR', 'last 2 chrome versions'], //browserslist
                        },
                        debug: true,
                    }],
                    '@babel/preset-react'
                ],
                plugins: [],
            },
        }],
    },
    plugins: [],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
    }
}