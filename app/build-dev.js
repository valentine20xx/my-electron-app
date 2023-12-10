const Webpack = require('webpack');

const webpackConfig = require('./dev.webpack.config');
const compiler = Webpack(webpackConfig);

// "app-build-dev": "webpack --config dev.webpack.config.js",
compiler.run();