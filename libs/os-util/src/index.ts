import { getAverageCpuLoad as cpuLoad} from './lib/helpers/cpu_util';
import {osInfo,cpuInfo,memoryInfo} from './lib/os-util';
//named export
export * from './lib/os-util';
export {cpuLoad};
//default export
const all = {
    osInfo,
    cpuInfo,
    memoryInfo,
    cpuLoad
}
export default all;