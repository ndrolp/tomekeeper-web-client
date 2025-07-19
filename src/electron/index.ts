import { app, BrowserWindow, Menu } from 'electron'
import path from 'node:path'

app.setName('Tomekeeper')
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })

    win.loadURL('http://localhost:5173')

    Menu.setApplicationMenu(null)
}

app.whenReady().then(() => {
    createWindow()
})
