import { app, BrowserWindow, Menu } from "electron";

app.setName("Tomekeeper");
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadURL("http://localhost:5173");

  Menu.setApplicationMenu(null);
};

app.whenReady().then(() => {
  createWindow();
});
