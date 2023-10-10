const { ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('windows-buttons').classList.remove('hidden')

  document.getElementById('close-button').addEventListener('click', window.close)
  document
    .getElementById('maximize-button')
    .addEventListener('click', () => ipcRenderer.send('maximize'))
  document
    .getElementById('minimize-button')
    .addEventListener('click', () => ipcRenderer.send('minimize'))
})
