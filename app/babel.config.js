const presets = [
    [
        "@babel/preset-env",
        {
            targets: {
                edge: "17",
                firefox: "60",
                chrome: "67",
                safari: "11.1",
            },
            useBuiltIns: "usage",
            corejs: "3.6.4",
        },
    ], ["@babel/preset-react"]
];

module.exports = {presets};


// {
//     "presets": ["@babel/preset-react", "@babel/preset-env"],
//     "plugins": ["@babel/plugin-transform-react-jsx"]
// }