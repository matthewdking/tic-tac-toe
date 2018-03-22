const path = require('path');

const config = {
  target: 'node',
  mode: 'development',
  entry: './index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dev'),
    filename: 'bundle.js',
  },
  devtool: 'eval-source-map',
};

module.exports = [config];
