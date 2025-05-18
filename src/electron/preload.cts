const electron = require('electron')

// bridge data between the electron process and the main window
electron.contextBridge.exposeInMainWorld('electron',  {
  subscribeStats: (callback: (stats: any) => void) => {
    electron.ipcRenderer.on('stats', (event: any, stats: any) => {
      callback(stats)
    })
  },
  getStaticData: () => electron.ipcRenderer.invoke('getStaticData'),
})
