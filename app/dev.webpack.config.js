const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: "development",
    entry: './src/index.tsx',
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: "tsconfig-dev.json"
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.(sass|scss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },

            {
                test: /\.(js|jsx|tsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
            minify: false,
            filename: "index.html"
        }),

    ],
    devServer: {
        port: 9000
    },
};