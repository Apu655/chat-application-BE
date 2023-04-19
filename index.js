const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
  },
});
io.on("connection",(socket)=>{
    console.log(`User Connected: ${socket.id}`)
    socket.on("join_room",(data)=>{
        console.log("Room",data)
        socket.join(data)
    })
    socket.on("send_message",(data)=>{
        console.log(data,"this is room")
        socket.to(data.room).emit("receive_message",(data))
    })
})
server.listen(5000,()=>{
    console.log("Server is running at port : 5000")
})