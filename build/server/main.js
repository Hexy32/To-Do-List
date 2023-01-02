"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./test");
const path = require("path");
const electron_1 = require("electron");
function createWindow() {
    const mainWindow = new electron_1.BrowserWindow({
        minWidth: 1000,
        minHeight: 700,
        width: 1280,
        height: 765,
        icon: 'assets/logos/64x64.png',
        darkTheme: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    mainWindow.loadFile('index.html');
    electron_1.ipcMain.on('maximize', () => {
        mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
    });
    electron_1.ipcMain.on('minimize', () => {
        mainWindow.minimize();
    });
}
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on('activate', function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
