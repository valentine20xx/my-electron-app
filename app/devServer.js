const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./dev.webpack.config');

const compiler = Webpack(webpackConfig);
const devServerOptions = {...webpackConfig.devServer};
const devServer = new WebpackDevServer(devServerOptions, compiler);

// devServer.startCallback(() => {
//     console.log('Successfully started...');
// });
const runServer = async () => {
    console.log('Starting devServer...');
    // await devServer.start();
    await devServer.startCallback(() => {
        console.log('Successfully started...');
    });
};

runServer();