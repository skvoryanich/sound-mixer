import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import initServices from './services'
import initListeners from './listeners'


function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            sandbox: false,
            // devTools: false
        }
    })

    mainWindow.loadFile(path.join(__dirname, '../front/index.html'))

    mainWindow.setMenuBarVisibility(false)

    const sevices = initServices()
    initListeners(sevices)

    mainWindow.on('closed', async () => {
        app.quit()
    })
}

app.on('window-all-closed', () => {
    app.quit()
});

app.whenReady().then( async () => {
    try {
        createWindow()

        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow()
            }
        })
    } catch (e) {
        // TODO: Переделать на логгер
        console.log(e)
    }
})
