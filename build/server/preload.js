"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const electron_2 = require("electron");
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    maximize: () => { },
});
window.addEventListener('DOMContentLoaded', () => {
    document
        .querySelector('.windows-buttons')
        .classList.remove('hidden');
    document
        .getElementById('close-button')
        .addEventListener('click', window.close);
    document
        .getElementById('maximize-button')
        .addEventListener('click', () => electron_2.ipcRenderer.send('maximize'));
    document
        .getElementById('minimize-button')
        .addEventListener('click', () => electron_2.ipcRenderer.send('minimize'));
});
