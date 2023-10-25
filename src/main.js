const {app, BrowserWindow, dialog, Menu} = require("electron");
const {join} = require("path");
const {readFile, writeFileSync} = require("fs");
const {Packer} = require("docx");
const {getDoc} = require("./module1");

const createWindow = () => {
    const browserWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: join(__dirname, 'preload.js'),
            nodeIntegration: true
        },
        show: false
    })

    browserWindow.loadFile('index.html').then(r => {
        console.log("index.html loaded")
    })

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

    // browserWindow.webContents.toggleDevTools();
}

app.whenReady().then(() => {
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

                    const doc = getDoc();

                    Packer.toBuffer(doc).then((buffer) => {
                        writeFileSync(filePath, buffer);
                    });
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
}];

const menu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menu)