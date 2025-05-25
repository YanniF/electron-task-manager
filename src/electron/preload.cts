const electron = require('electron')

// bridge data between the electron process and the main window
electron.contextBridge.exposeInMainWorld('electron',  {
  subscribeStats: (callback: (stats: Stats) => void) => {
    ipcOn('stats', (stats: any) => {
      callback(stats)
    })
  },
  getStaticData: () => ipcInvoke('getStaticData'),
} satisfies Window['electron'])

function ipcInvoke<Key extends keyof EventPayloadMapping>(
  key: Key
): Promise<EventPayloadMapping[Key]> {
  return electron.ipcRenderer.invoke(key);
}

function ipcOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) {
  electron.ipcRenderer.on(key, (_: any, payload: any) => callback(payload));
}
