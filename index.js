const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.use(express.static(__dirname + '/public'));
let name = 'mohan';
let counter = 0;
io.on('connection', (socket) => {
  // Send the current counter value to a new user
  io.emit('displayer', name);
  io.emit('updateCounter', counter);
  // Listen for button clicks
  socket.on('increment', () => {
    // Increment the counter
    counter++;
    io.emit('updateCounter', counter);
  });
  socket.on('name', (nam) => {
    io.emit('displayer', nam);
  });

  // i can add more functionality like decrement, reset, etc., in a similar way
  socket.on('decrement', () => {
    counter--;
    io.emit('updateCounter', counter);
  });
});

app.listen(8080, () => {
  console.log(`Server is Listening on http://localhost:${8080}`);
});
