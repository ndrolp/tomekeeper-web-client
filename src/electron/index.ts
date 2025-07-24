import { app, BrowserWindow, globalShortcut, Menu } from 'electron'
import path from 'node:path'

app.setName('Tomekeeper')
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    })

    console.log(__dirname)
    win.loadURL('http://localhost:5173')

    globalShortcut.register('CommandOrControl+Shift+I', () => {
        win?.webContents.toggleDevTools()
    })

    Menu.setApplicationMenu(null)
}

app.whenReady().then(() => {
    createWindow()
})
