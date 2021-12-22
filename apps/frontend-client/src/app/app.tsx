import io from 'socket.io-client';
import { useCallback, useEffect, useState } from "react"
import { ClientSocket, IMachine, MachinePerformanceData } from '@performance-monitor/domain/interfaces';
import {environment} from '../environments/environment';
import MachineItem from './components/MachineItem/MachineItem';
interface PerformanceDataState{
  [index:string]:MachinePerformanceData
}
const App = () => {
  const [activeMachineAdddressList, setActiveMachineAdddressList] = useState<string[]>([]);
  const [machineList, setMachineList] = useState<IMachine[]>([]);
  const [machinePerformanceData, setMachinePerformanceData] = useState<PerformanceDataState>({});
  const addActiveAddress = (address:string)=>{
    setActiveMachineAdddressList((prevState)=>{
      return [...prevState,address];
    })
  }
  useEffect(()=>{
    const serverUrl = environment.socketUrl;
    const socket:ClientSocket = io(serverUrl+"/ui");
    socket.on("connect",()=>{
      socket.on("machine:list",(list)=>{
        setMachineList(list);
      })
      socket.on("activated-machine:address:list",(list)=>{
        setActiveMachineAdddressList(list);
      })
      socket.on("machine:activated:new",(newMachine)=>{
        setMachineList((prevList)=>{
          return [...prevList,newMachine];
        })
        addActiveAddress(newMachine.macAddress);
      })
      socket.on("machine:activated:old",(address)=>{
        addActiveAddress(address);
      })
      socket.on("machine:deactivated",(address)=>{
        setActiveMachineAdddressList((prevState)=>{
          return prevState.filter(oldAddress=>oldAddress !== address);
        })
      })
      socket.on("machine:performance-data",(macAddress,performanceData)=>{
        setMachinePerformanceData((prevData)=>{
          return {
            ...prevData,
            [macAddress]:performanceData
          }
        })
      })
    })
    return ()=>{
      socket.close();
      socket.disconnect();
    }
  },[])
  const activatedAddressSet = useCallback(()=>{
    return new Set(activeMachineAdddressList);
  },[activeMachineAdddressList]);
  return (
    <div>
      {machineList.map((machine,index)=>{
        const isOnline = activatedAddressSet().has(machine.macAddress);
        const performanceData= machinePerformanceData[machine.macAddress] as MachinePerformanceData | undefined;
        return <MachineItem key={machine.macAddress} isOnline={isOnline} performanceData={performanceData} machineInfo={machine}/>
      })}
    </div>
  )
}
export default App
