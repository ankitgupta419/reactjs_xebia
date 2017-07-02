var ExtractTextPlugin = require('extract-text-webpack-plugin');

var path = require('path');
module.exports = {
    entry: path.resolve(__dirname, 'src', 'Main.js'),
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-1'],
            }
        }
         ]
    },
    
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './',
    }
};