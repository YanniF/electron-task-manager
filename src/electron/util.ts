import {ipcMain, WebContents} from "electron";

export function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

// we need a wrapper (adapter) to set the type, the type will depend on the key
export function ipcMainHandle<Key extends keyof EventPayloadMapping>(key: Key, handler: () => EventPayloadMapping[Key]) {
  ipcMain.handle(key, () => handler())
}

export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(
  key: Key,
  webContents: WebContents,
  payload: EventPayloadMapping[Key]
) {
  webContents.send(key, payload);
}
