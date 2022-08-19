import { contextBridge } from 'electron'
import { ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  maximize: () => {},
})

window.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('close-button')!
    .addEventListener('click', window.close)
  document
    .getElementById('maximize-button')!
    .addEventListener('click', () => ipcRenderer.send('maximize'))
  document
    .getElementById('minimize-button')!
    .addEventListener('click', () => ipcRenderer.send('minimize'))
})
