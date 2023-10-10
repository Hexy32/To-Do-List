const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    minWidth: 1000,
    minHeight: 700,
    width: 1280,
    height: 765,
    icon: './public/assets/logos/64x64.png',
    darkTheme: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.cjs'),
    },
  })

  win.loadFile('dist/index.html')

  ipcMain.on('maximize', () => {
    win.isMaximized() ? win.unmaximize() : win.maximize()
  })

  ipcMain.on('minimize', () => {
    win.minimize()
  })
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
