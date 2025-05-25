import osUtils from 'os-utils'
import fs from 'fs'
import os from 'os'
import {BrowserWindow} from "electron";
import {ipcWebContentsSend} from "./util.js";

// how often are we going to check the resources
const POLLING_INTERVAL = 500;

export const pollResources = (mainWindow: BrowserWindow) => {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage()
    const ramUsage = getRamUsage()
    const storageInfo = getStorageInfo()

    ipcWebContentsSend('stats', mainWindow.webContents, {
      cpuUsage,
      ramUsage,
      storageUsage: storageInfo.usage,
    })
  }, POLLING_INTERVAL)
}

export const getStaticData = () => {
  const totalStorage = getStorageInfo().total
  const cpuModel = os.cpus()[0].model
  const totalMemoryGB = Math.floor(osUtils.totalmem() / 1024)

  return {
    totalStorage,
    cpuModel,
    totalMemoryGB
  }
}

const getCpuUsage = (): Promise<number> => {
  return new Promise((resolve) => {
    osUtils.cpuUsage(resolve)
  })
}

const getRamUsage = (): number => {
  return 1 - osUtils.freememPercentage()
}

const getStorageInfo = (): { total: number, usage: number } => {
  const stats = fs.statfsSync(process.platform === 'win32' ? 'C://' : '/')
  const total = stats.bsize * stats.blocks
  const free = stats.bsize * stats.bfree

  return {
    total: Math.floor(total / 1_000_000_000), // giga
    usage: 1 - free / total,
  }
}
