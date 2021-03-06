const path = require('path');

module.exports = {
    name: 'RSP-setting',
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx'],
    },

    entry: {
        app: ['./Advanced_client'],
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/preset-env',
                    '@babel/preset-react',
                ],
            },
        }]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
    },
}