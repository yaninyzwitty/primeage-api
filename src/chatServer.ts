import app from "./index"
import { Server } from 'socket.io'
import http from 'http'
import cors from 'cors'
 const port  = 8081

const server = http.createServer(app)

app.use((cors()))
const io = new Server(server, {

    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
})


io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
console.log("Clients in room", data.room, io.sockets.adapter.rooms.get(data.room));
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});  


server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})