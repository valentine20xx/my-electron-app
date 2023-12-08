const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./dev.webpack.config');

const compiler = Webpack(webpackConfig);
const devServerOptions = {...webpackConfig.devServer};
const devServer = new WebpackDevServer(devServerOptions, compiler);

const runServer = async () => {
    console.log('Starting devServer...');

    await devServer.startCallback(() => {
        console.log('DevServer successfully started...');
    });
};

runServer();