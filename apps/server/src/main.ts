import mongoose from 'mongoose';
import http from 'http';
import initSocketServer from './app/socket_server';
import { createClient } from '@node-redis/client';
const port = process.env.PORT || 3000;
const server = http.createServer();
const mongoDbUrl = process.env.NX_MONGODB_URL;
const redisUrl = process.env.NX_REDIS_URL;
if(!mongoDbUrl || !redisUrl){
    throw new Error("Env variables not provided properly");
}
(async()=>{
    try {
        const client = createClient({url:redisUrl});
        await client.connect();
        await initSocketServer(server,client);
        await mongoose.connect(mongoDbUrl)
        .then(()=>console.log("Mongodb connected"))
        server.listen(port,()=>{
            console.log(`Server started at ${port} port with pid: `+process.pid);
        })
    } catch (error) {
        console.log("Server initilization error");
        console.log(error.message);
    }

})();