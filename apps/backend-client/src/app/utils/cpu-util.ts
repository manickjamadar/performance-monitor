import os ,{CpuInfo} from 'os';
interface CpuTimes{
    idle:number
    total:number
}
export const getCpuTimes = (cpu:CpuInfo):CpuTimes=>{
    let totalTime = 0;
    for (const key in cpu.times){
        totalTime += cpu.times[key]
    }
    return {
        idle: cpu.times.idle,
        total: totalTime
    }
}
export const getAverageCpuTimes = ():CpuTimes=>{
    const allCpus = os.cpus();
    let idleTime = 0;
    let totalTime = 0;
    allCpus.forEach((cpu)=>{
        const cpuTimes = getCpuTimes(cpu);
        idleTime += cpuTimes.idle;
        totalTime += cpuTimes.total;
    })
    return {
        idle: idleTime/allCpus.length,
        total: totalTime/allCpus.length
    }
}
export const getAverageCpuLoad = (time=100):Promise<number>=>{
    return new Promise((resolve,reject)=>{
        if(time < 0){
            reject();
        }
        const start = getAverageCpuTimes();
        setTimeout(() => {
            const end = getAverageCpuTimes();
            const idleDiff = end.idle - start.idle;
            const totalDiff = end.total - start.total;
            const load = 100 - Math.floor((100 * idleDiff)/totalDiff);
            resolve(load);
        }, time);
    })
}