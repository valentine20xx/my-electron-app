const {contextBridge, ipcRenderer, dialog} = require('electron')

const SAVE_DOCX_1 = 'save-docx-electron-to-web';
const SAVE_DOCX_2 = 'save-docx-web-to-electron';

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
})

ipcRenderer.on(SAVE_DOCX_1, (event, args) => {
    // const name = sessionStorage.getItem("name");
    // const surname = sessionStorage.getItem("surname");

    const contextString = sessionStorage.getItem("context");
    const context = JSON.parse(contextString);
    console.log(context)
    console.log(context.name)
    console.log(context.surname)

    ipcRenderer.send(SAVE_DOCX_2, {name: context.name, surname: context.surname})
})

window.addEventListener('DOMContentLoaded', () => {
    const strArray = [];
    for (const dependency in process.versions) {
        strArray.push(`${dependency}: ${process.versions[dependency]}`)
    }

    console.log(`environment-info: [${strArray.join(", ")}]`);
})