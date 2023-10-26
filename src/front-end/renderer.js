// const information = document.getElementById('info')
// information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`

const HelloMessage = (props) => {
    return React.createElement(
        "div",
        null,
        "Hello ",
        props.name
    );
}
const root = document.getElementById('root')
const reactRoot = ReactDOM.createRoot(root)

reactRoot.render(React.createElement(HelloMessage, {name: "User"}));