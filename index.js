const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
let name="mohan"
let counter = 0;
io.on('connection', (socket) => {
  // Send the current counter value to a new user
  io.emit("name",name)
  io.emit("updateCounter",counter)
  // Listen for button clicks
  socket.on('increment', () => {
    // Increment the counter
    counter++;
    io.emit('updateCounter', counter);
  });
  socket.on("name",(nam)=>{
    name+=nam
    io.emit("name",nam)
  })

  // i can add more functionality like decrement, reset, etc., in a similar way
  socket.on("decrement",()=>{
    counter--
    io.emit("updateCounter",counter)
});

app.use(express.static(__dirname + '/public'));

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
