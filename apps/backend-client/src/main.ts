import mac from 'macaddress';
import osUtil from '@performance-monitor/os-util';
import { ClientSocket, IMachine, MachinePerformanceData } from '@performance-monitor/domain/interfaces';
import io from 'socket.io-client';
const serverUrl =process.env.NX_SOCKET_URL;
if(!serverUrl){
    throw Error("NX_SOCKET_URL needed as env variable");
}
const socketUrl = serverUrl+"/machine";

mac.one().then(address=>{
    const machineInfo:IMachine = {
        macAddress:address,
        osType:osUtil.osInfo().type,
        totalMemory: osUtil.memoryInfo().total,
        cpuInfo: osUtil.cpuInfo()
    };
    const socket:ClientSocket = io(socketUrl,{
        auth:{
            token:"h5io2354ioh245"
        },
        query:{
            macAddress:address
        }
    });
    let dataTimer:NodeJS.Timeout;
    socket.on("connect",()=>{
        console.log("Machine connected to server with mac:"+address);
        socket.emit("activate:machine",machineInfo,(err)=>{
            if(err){
                console.log("Machine Activation error");
                socket.close();
                socket.disconnect();
            }else{
                dataTimer = setInterval(()=>{
                    osUtil.cpuLoad().then(load=>{
                        const data:MachinePerformanceData = {
                            upTime:osUtil.osInfo().uptime,
                            freeMemory:osUtil.memoryInfo().free,
                            cpuLoad:load
                        }
                        socket.emit("performance-data",data);
                    })
                },1000);
            }
        });
    })
    socket.on("connect_error",(err)=>{
        console.log("Machine server connection error");
        console.log(err.message);
    })
    socket.on("disconnect",(reason)=>{
        if(dataTimer){
            clearInterval(dataTimer);
        }
        console.log("Machine disconnected from server becaues of "+reason);
    })
}).catch(()=>{
    console.log("Fetching mac addresss failed");
})


