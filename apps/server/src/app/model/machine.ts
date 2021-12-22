import { IMachine } from '@performance-monitor/domain/interfaces';
import mongoose from 'mongoose';


export const machineSchema = new mongoose.Schema<IMachine>({
    macAddress: {type:String,required: true},
    osType:{type:String,required: true},
    totalMemory:{type:Number,required:true},
    cpuInfo:{
        type: {type:String,required: true},
        totalCores: {type:Number,required:true},
        totalClockSpeed:{type:Number,required:true}
    }
})

const machineModel = mongoose.model("Machine",machineSchema);

export default machineModel;