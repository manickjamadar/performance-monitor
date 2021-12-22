import mongoose from 'mongoose';
import http from 'http';
import initSocketServer from './app/socket_server';
const port = process.env.PORT || 3000;
const server = http.createServer();
const mongoDbUrl = process.env.NX_MONGODB_URL;
if(!mongoDbUrl){
    throw new Error("Mongo db url needed as env variable");
}
(async()=>{
    try {
        await initSocketServer(server);
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