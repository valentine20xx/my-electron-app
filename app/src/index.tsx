import * as React from "react";
import * as MaterialUI from "@mui/material";
import * as ReactDOMClient from "react-dom/client";
import "./renderer.css"

const Custom = {
    NameTextField: () => {
        return (<MaterialUI.TextField variant="outlined" label="Name" onChange={
            (event) => {
                sessionStorage.setItem("name", event.target.value)
            }}
        />)
    },
    SurnameTextField: () => {
        return (<MaterialUI.TextField variant="outlined" label="Surname" onChange={
            (event) => {
                sessionStorage.setItem("surname", event.target.value)
            }
        }/>)
    },
    Article: () => {
        return (
            <MaterialUI.Box className="screen">
                <Custom.NameTextField/>
                <Custom.SurnameTextField/>
            </MaterialUI.Box>
        )
    },
    Footer: () => {
        return (<MaterialUI.Box id="footer" className="footer">
            footer
        </MaterialUI.Box>)
    }
}

const Main = () => {
    return (<MaterialUI.Box className="main">
        <Custom.Article/>
        <Custom.Footer/>
    </MaterialUI.Box>)
}

const App = () => {
    return (<Main/>)
}

const root = document.getElementById('root')
const reactRoot = ReactDOMClient.createRoot(root)
reactRoot.render(<App/>);
