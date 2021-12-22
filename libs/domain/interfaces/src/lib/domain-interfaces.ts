import { Server, Socket } from "socket.io";
import {Socket as CSocket} from 'socket.io-client';
export interface SocketOption{
    auth:{
        token:string
    },
    query:{
        machineInfo:IMachine
    }
}
export interface IMachine{
    macAddress:string;
    osType:string,
    totalMemory:number,
    cpuInfo:{
        type:string,
        totalCores:number,
        totalClockSpeed:number
    }
}
export interface MachinePerformanceData{
    upTime:number,
    freeMemory:number,
    cpuLoad:number
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ServerToClientEvents{
    "machine:list":(machineList:IMachine[])=>void
    "activated-machine:address:list":(addressList:string[])=>void
    "machine:activated:new":(machineInfo:IMachine)=>void
    "machine:activated:old":(macAddress:string)=>void
    "machine:deactivated":(macAddress:string)=>void
    "machine:performance-data":(macAddress:string,performanceData:MachinePerformanceData)=>void
}
export interface ClientToServerEvents{
    "activate:machine": (info:IMachine,callback:(err?:Error)=>void)=>void
    "performance-data": (data:MachinePerformanceData)=>void
}
export type ServerSocket = Socket<ServerToClientEvents,ClientToServerEvents>;
export type ClientSocket = CSocket<ServerToClientEvents,ClientToServerEvents>;
export type IoServer = Server<ClientToServerEvents, ServerToClientEvents>;