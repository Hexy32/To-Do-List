"use strict";
const { app, BrowserWindow, ipcMain } = require('electron'), fs = require('fs'), path = require('path');
function createWindow() {
    const mainWindow = new BrowserWindow({
        minWidth: 1000,
        minHeight: 700,
        icon: 'assets/logos/64x64.png',
        darkTheme: true,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    mainWindow.maximize();
    mainWindow.loadFile('build/html/index.html');
    mainWindow.webContents.openDevTools();
}
app.whenReady().then(() => {
    createWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        app.quit();
});
