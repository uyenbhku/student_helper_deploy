const path = require('path');

module.exports = {
  mode: 'development',
  entry: './view/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'static/js'),
  },
  module: { rules: [
    {
      test: /\.js$/,
      include: [
        path.resolve(__dirname, 'view')
      ],
      use: ['babel-loader'],
    },
  ]},
};
