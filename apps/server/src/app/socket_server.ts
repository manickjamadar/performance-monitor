import {Server as HttpServer} from 'http';
import { Server } from "socket.io";
import { IMachine, IoServer} from '@performance-monitor/domain/interfaces';
import Machine from './model/machine';
const tokens = new Set(["h5io2354ioh245","adsfhio2523hi34io"]);
const activatedMachines = new Set<string>();
const initSocketServer = async(server:HttpServer)=>{
    try {
        const io:IoServer = new Server(server,{cors:{origin:"*"}});
        const machineIo = io.of("/machine");
        const uiIo = io.of("/ui");
        uiIo.on("connection",async(socket)=>{
            try {
                //fetch machine list
                const machines:IMachine[] = await Machine.find({});
                //emit all machine liust
                socket.emit("machine:list",machines);
                socket.emit("activated-machine:address:list",Array.from(activatedMachines.values()));
            } catch (error) {
                console.log("All machine fetch failed");
            }
        })
        machineIo.use((socket,next)=>{
            const authToken = socket.handshake.auth.token as string | undefined;
            const macAddress = socket.handshake.query.macAddress;            
            if(tokens.has(authToken) && macAddress && !Array.isArray(macAddress)){
                next();
            }else{
                next(new Error("Auth Token and MacAdress query Authentication failed"));
            }
        })
        machineIo.on("connection",(socket)=>{
            const macAddress = socket.handshake.query.macAddress as string;
            socket.on("activate:machine",async(machineInfo,callback)=>{
                try {
                    const existMachine = await Machine.findOne({macAddress:machineInfo.macAddress});
                    if(!existMachine){
                        const machine = new Machine(machineInfo);
                        await machine.save();
                        uiIo.emit("machine:activated:new",machine);
                        console.log("New Machine saved");
                    }else{
                        uiIo.emit("machine:activated:old",macAddress);
                    }
                    activatedMachines.add(macAddress);
                    callback();
                } catch (error) {
                    console.log("Activating machine error");
                    callback(new Error("Activation Error"));
                }
            })
            socket.on("performance-data",(performanceData)=>{
                uiIo.emit("machine:performance-data",macAddress,performanceData);
            })
            console.log(`${socket.id} connected`);
            socket.on("disconnect",async(reason)=>{
                activatedMachines.delete(macAddress);
                uiIo.emit("machine:deactivated",macAddress);
                console.log(`${socket.id} => ${macAddress} disconnected because of ${reason}`);
            })      
        })
        console.log("Socket Server Initialized");
        return io;
    } catch (error) {
        console.log("Socket Server Initialization error");
    }
}

export default initSocketServer;