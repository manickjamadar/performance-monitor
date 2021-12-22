import os from 'os';
import getOsType from './helpers/get_os_type';
export interface OsInfo{
  type:string,
  /**
   * specified in seconds
   */
  uptime:number
}
export interface MemoryInfo{
  /**
   * specified in bytes
   */
    free:number,
    /**
     * specified in bytes
     */
    total:number,
    usage:number
}
export interface CpuInfo {
  type:string,
  totalCores:number,
  /**
   * specified in mhz
   */
  totalClockSpeed:number
}
export const osInfo = ():OsInfo=>{
  return {
    type: getOsType(),
    uptime: os.uptime(),
  }
}
export const memoryInfo = ():MemoryInfo=>{
  const freeMemory = os.freemem();
  const totalMemory = os.totalmem();
  return {
    free: freeMemory,
    total: totalMemory,
    usage: Math.round((totalMemory - freeMemory)*100/totalMemory)
  }
}
export const cpuInfo = ():CpuInfo=>{
  const cpus = os.cpus();
  return {
    totalCores: cpus.length,
    type:cpus[0].model.trim(),
    totalClockSpeed: cpus[0].speed
  }
}