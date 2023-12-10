import * as React from "react";
import * as MaterialUI from "@mui/material";
import * as ReactDOMClient from "react-dom/client";
import "./renderer.scss"
import * as MaterialColors from "@mui/material/colors";
import {ACTION_TYPES, initializer, initializerArg, reducer} from "./state/state";

const App = () => {
    const [state, dispatch] = React.useReducer(reducer, initializerArg, initializer);

    return (
        <MaterialUI.Box className="main">
            <MaterialUI.AppBar position="static">
                <MaterialUI.Toolbar>
                    <MaterialUI.Typography variant="h5">
                        Docx generator
                    </MaterialUI.Typography>
                </MaterialUI.Toolbar>
            </MaterialUI.AppBar>
            <MaterialUI.Box className="screen">
                <MaterialUI.Container maxWidth="lg" sx={theme => {
                    return {
                        display: "flex", flexDirection: "row", columnGap: "1em",
                        [theme.breakpoints.down("sm")]: {
                            display: "flex", flexDirection: "column", rowGap: "1em",
                        }
                    }
                }}>
                    <MaterialUI.Paper sx={{width: "100%"}} elevation={3}>
                        <MaterialUI.TextField fullWidth variant="outlined" value={state.name} label="Name" onChange={(event) => {
                            dispatch({type: ACTION_TYPES.NAME_CHANGED, payload: event.target.value})
                        }}/>
                    </MaterialUI.Paper>
                    <MaterialUI.Paper sx={{width: "100%"}} elevation={3}>
                        <MaterialUI.TextField fullWidth variant="outlined" value={state.surname} label="Surname" onChange={(event) => {
                            dispatch({type: ACTION_TYPES.SURNAME_CHANGED, payload: event.target.value})
                        }}/>
                    </MaterialUI.Paper>
                </MaterialUI.Container>
            </MaterialUI.Box>
            <MaterialUI.Box sx={(theme) => {
                return {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.common.white,
                    padding: "0.25em"
                }
            }}>
                footer
            </MaterialUI.Box>
        </MaterialUI.Box>
    )
}

const theme = MaterialUI.createTheme({
    palette: {
        primary: MaterialColors.indigo,
        secondary: {
            main: '#292A2D',
        }
    },
    components: {
        MuiContainer: {
            styleOverrides: {
            }
        }
    }
});


const root = document.getElementById('root')
const reactRoot = ReactDOMClient.createRoot(root)
reactRoot.render(
    <React.StrictMode>
        <MaterialUI.ThemeProvider theme={theme}>
            <App/>
        </MaterialUI.ThemeProvider>
    </React.StrictMode>
);
