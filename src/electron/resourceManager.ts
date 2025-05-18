import osUtils from 'os-utils'
import fs from 'fs'
import os from 'os'

// how often are we going to check the resources
const POLLING_INTERVAL = 500;

export const pollResources = () => {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage()
    const ramUsage = getRamUsage()
    const storageInfo = getStorageInfo()

    console.log(`cpuUsage: ${cpuUsage}`)
    console.log(`ramUsage: ${ramUsage}`)
    console.log('storageInfo:', storageInfo)
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

const getCpuUsage = () => {
  return new Promise((resolve) => {
    osUtils.cpuUsage(resolve)
  })
}

const getRamUsage = () => {
  return 1 - osUtils.freememPercentage()
}

const getStorageInfo = () => {
  const stats = fs.statfsSync(process.platform === 'win32' ? 'C://' : '/')
  const total = stats.bsize * stats.blocks
  const free = stats.bsize * stats.bfree

  return {
    total: Math.floor(total / 1_000_000_000), // giga
    usage: 1 - free / total,
  }
}
