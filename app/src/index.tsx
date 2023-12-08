import * as React from "react";
import * as MaterialUI from "@mui/material";
import * as ReactDOMClient from "react-dom/client";
import "./renderer.css"

interface Model {
    name?: string;
    surname?: string;
}


enum ACTION_TYPES {
    NAME_CHANGED,
    SURNAME_CHANGED
}

interface StateAction {
    type: ACTION_TYPES;
    payload: any;
}

const ctx = "context";

const reducer = (state: Model, action: StateAction) => {
    const {type, payload} = action;
    switch (type) {
        case ACTION_TYPES.NAME_CHANGED: {
            const newState = {...state, name: payload}
            sessionStorage.setItem(ctx, JSON.stringify(newState))
            return newState;
        }
        case ACTION_TYPES.SURNAME_CHANGED: {
            const newState = {...state, surname: payload}
            sessionStorage.setItem(ctx, JSON.stringify(newState))
            return newState;
        }
        default:
            return {...state}
    }
}

const initializer = (model: Model): Model => {
    sessionStorage.setItem(ctx, JSON.stringify(model))

    return model;
}

const initializerArg: Model = {name: "", surname: ""}

const App = () => {
    const [state, dispatch] = React.useReducer(reducer, initializerArg, initializer);

    return (
        <MaterialUI.Box className="main">
            <MaterialUI.Box className="screen">
                <MaterialUI.TextField variant="outlined" value={state.name} label="Name" onChange={
                    (event) => {
                        dispatch({type: ACTION_TYPES.NAME_CHANGED, payload: event.target.value})
                    }}/>
                <MaterialUI.TextField variant="outlined" value={state.surname} label="Surname" onChange={
                    (event) => {
                        dispatch({type: ACTION_TYPES.SURNAME_CHANGED, payload: event.target.value})
                    }}/>
            </MaterialUI.Box>
            <MaterialUI.Box id="footer" className="footer">
                footer
            </MaterialUI.Box>
        </MaterialUI.Box>
    )
}

const root = document.getElementById('root')
const reactRoot = ReactDOMClient.createRoot(root)
reactRoot.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
