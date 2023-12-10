const {app, BrowserWindow, dialog, Menu, ipcMain} = require("electron");
const {join} = require("path");
const {readFile, writeFileSync} = require("fs");
const {Packer} = require("docx");
const {getDoc} = require("./module1");

const SAVE_DOCX_1 = 'save-docx-electron-to-web';
const SAVE_DOCX_2 = 'save-docx-web-to-electron';
let browserWindow;
const createWindow = () => {
    browserWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: join(__dirname, 'preload.js')
        },
        icon: join(__dirname, '/media/contract_78463.png'),
        show: false
    })

    console.log(process.env.STAGE)

    if (process.env.STAGE === "dev") {
        browserWindow.loadFile('../../app/dist/index.html').then(r => {
            console.log("index.html loaded", r)
        })
        browserWindow.webContents.openDevTools({mode: 'detach'});
    } else {
        browserWindow.loadFile('app/index.html').then(r => {
            console.log("index.html loaded", r)
        })
    }
    // else {
    //     // new Error("process.env.STAGE is not set")
    //     dialog.showMessageBox({message: "process.env.STAGE is not set"})
    // }

    browserWindow.on('close', (e) => {
        let response = dialog.showMessageBoxSync(browserWindow, {
            type: 'question',
            buttons: ['Yes', 'No'],
            title: 'Confirm',
            message: 'Are you sure you want to quit?'
        });

        if (response === 1) e.preventDefault();
    });

    browserWindow.show();


}

app.whenReady().then(() => {
    ipcMain.on(SAVE_DOCX_2, (event, args) => {
        dialog.showSaveDialog({
            title: "Save docx file",
            filters: [{name: "Docx file", extensions: ["docx"]}]
        }).then(saveDialogReturnValue => {
            const filePath = saveDialogReturnValue.filePath;
            const canceled = saveDialogReturnValue.canceled;

            console.log("filePath", filePath);
            console.log("canceled", canceled);

            if (!canceled) {
                const name = args.name;
                const surname = args.surname;

                const doc = getDoc(name, surname);

                Packer.toBuffer(doc).then((buffer) => {
                    writeFileSync(filePath, buffer);
                });
            }
        })

    })

    createWindow()
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})


const menuTemplate = [{
    label: 'File',
    submenu: [
        {
            label: 'New',
            enabled: false
        },
        {
            label: 'Open',
            // enabled: false,
            click: () => {
                const res = dialog.showOpenDialog({properties: ['openFile']})
                // console.log(e)
                res.then(value => {
                    console.log(value)
                    readFile(value.filePaths[0], 'utf8', (err, data) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        console.log(data);
                    });
                })
            }
        },
        {
            label: 'Save',
            click: () => {
                dialog.showSaveDialog({
                    title: "Save docx file",
                    filters: [{name: "Docx file", extensions: ["docx"]}]
                }).then(saveDialogReturnValue => {
                    const filePath = saveDialogReturnValue.filePath;
                    const canceled = saveDialogReturnValue.canceled;

                    console.log("filePath", filePath);
                    console.log("canceled", canceled);
                })
            }
        },
        {
            type: 'separator'
        },
        {
            label: 'Quit',
            role: 'quit'
        }
    ]
}, {
    label: 'Generate',
    submenu: [{
        label: 'Report',
        click: () => {
            browserWindow.webContents.send(SAVE_DOCX_1);
        }
    }]
}];

const menu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menu)