var webpack = require('webpack');
var path = require('path');

module.exports = {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client',
    './src/index.js',
  ],
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css/,
        loader: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(ttf|woff|woff2)/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};