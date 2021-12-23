import { RedisClientType } from "redis";

class ActivatedMachine{
    static path="activated:machine";
    public client:RedisClientType;
    constructor(client:RedisClientType){
        this.client = client;
    }
    async values():Promise<string[]>{
        const result = await this.client.sMembers(ActivatedMachine.path);
        return result;
    }
    async add(value:string):Promise<void>{
        await this.client.sAdd(ActivatedMachine.path,value);
        return;
    }
    async delete(value:string):Promise<void>{
        await this.client.sRem(ActivatedMachine.path,value);
        return;
    }
}
export default ActivatedMachine;