const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: "production",
  entry: {
    "mod.js": './ts/mod.ts',
    "micro/mod.js": './ts/micro/mod.ts'
  },
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: '[name]'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    minimizer: [new TerserPlugin()]
  }
};
