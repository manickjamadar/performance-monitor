import styled from 'styled-components';
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { IMachine, MachinePerformanceData } from '@performance-monitor/domain/interfaces'
import React, { FunctionComponent } from 'react'
interface Props{
    isOnline?:boolean,
    machineInfo:IMachine,
    performanceData?: MachinePerformanceData
}
const Wrapper = styled.div`
    border: 1px solid black;
    padding: 20px;
    display: inline-block;
    margin: 10px;
`;
const Status = styled.div<{online:boolean}>`
    background-color: #eee;
    padding: 10px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 74px;
    font-weight: bold;
    font-size: 15px;
    border-radius: 30px;
    &::before{
        display: inline-block;
        content: "";
        width:12px;
        height:12px;
        background-color: ${props=>props.online ? "green":"#ff4a4a"};
        border-radius: 50%;
    }
`;
const CircularContainer = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-evenly;
    gap: 20px;
`;
const CircularWrapper = styled.div`
    text-align: center;
    width: 124px;
`;
const MachineItem:FunctionComponent<Props> = ({isOnline=false,machineInfo,performanceData}) => {
    const cpuLoad = performanceData?.cpuLoad || 0;
    const freeMemory = ((performanceData?.freeMemory || 0)/(1024*1024*1024)).toFixed(2);
    const totalMemory = ((machineInfo.totalMemory || 0)/(1024*1024*1024)).toFixed(2);
    const memoryUsage  =performanceData?.freeMemory?Math.floor((machineInfo.totalMemory - (performanceData?.freeMemory))*100/machineInfo.totalMemory):0;
    return (
        <Wrapper>
            <Status online={isOnline}>{isOnline?"Online":"Offline"}</Status>
            <div key={machineInfo.macAddress}>
                <CircularContainer>
                    <CircularWrapper>
                        <p>Cpu Usage</p>
                        <CircularProgressbar value={cpuLoad} text={`${cpuLoad}%`} />
                    </CircularWrapper>
                    <CircularWrapper>
                        <p>Memory Usage</p>
                        <CircularProgressbar value={memoryUsage} text={`${memoryUsage}%`} />
                    </CircularWrapper>
                </CircularContainer>
            <p><b>Memory:</b> {freeMemory} GB / {totalMemory} GB</p>
            <p><b>Mac Address</b>: {machineInfo.macAddress}</p>
            <p><b>Cpu Type</b>: {machineInfo.cpuInfo.type}</p>
            <p><b>Uptime</b>: {performanceData?.upTime || 0} seconds</p>
          </div>
        </Wrapper>
    )
}

export default MachineItem
