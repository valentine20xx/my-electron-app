const presets = [
    ["@babel/preset-env", {
        targets: {
            edge: "17", firefox: "60", chrome: "67", safari: "11.1",
        },
        useBuiltIns: "usage",
        corejs: "3.6.4",
    },],
    ["@babel/preset-react"],
    // typescript Interface support
    ["@babel/preset-typescript"]];


const plugins = [
    // Triple dot support
    ["@babel/plugin-transform-object-rest-spread", {useBuiltIns: true}]
];

module.exports = {
    assumptions: {
        setSpreadProperties: true
    }, presets, plugins
};
