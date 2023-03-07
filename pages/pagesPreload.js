const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('electronAPI', {
    sendToMySQL: (data) => ipcRenderer.send('set-massg', data),
    getHistorys: (history) => ipcRenderer.send('get-historys', history),
    viewResult: (results) => ipcRenderer.on('send-history', results),
})
