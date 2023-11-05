// const information = document.getElementById('info')
// information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`

const NameTextField = () => {
    return React.createElement(MaterialUI.TextField, {
        variant: "outlined", label: "Name", onChange: event => {
            sessionStorage.setItem("name", event.target.value)
        }
    })
}

const SurnameTextField = () => {
    return React.createElement(MaterialUI.TextField, {
        variant: "outlined", label: "Surname", onChange: event => {
            sessionStorage.setItem("surname", event.target.value)
        }
    })
}

const Article = () => {
    const nameTextField = NameTextField();
    const surnameTextField = SurnameTextField();

    return React.createElement(MaterialUI.Box, {className: "screen"}, nameTextField, surnameTextField)
}
const Footer = () => {
    return React.createElement(MaterialUI.Box, {className: "footer"}, "footer")
}

const Main = React.createElement(MaterialUI.Box, {className: "main"}, Article(), Footer())

const root = document.getElementById('root')
const reactRoot = ReactDOM.createRoot(root)
reactRoot.render(Main);
// const func = async () => {
//     const response = await window.versions.ping()
//     console.log(response) // prints out 'pong'
// }
//
// func()

// window.addEventListener()