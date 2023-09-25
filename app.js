const express = require('express');
const path = require('path');
const sequelize = require('./config/config');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, 'public')));

sequelize
  .sync()
  .then(() => {
    console.log('Database synced and connected');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

const io = require('socket.io')(server);

let socketConnected = new Set();
io.on('connection', onConnected);

function onConnected(socket) {
  console.log('socked', socket.id);
  socketConnected.add(socket.id);

  io.emit('clients-total', socketConnected.size);

  socket.on('disconnect', () => {
    console.log('Socket disconnected :', socket.id);
    socketConnected.delete(socket.id);
    io.emit('clients-total', socketConnected.size);
  });

  socket.on('message', (data) => {
    console.log('message', data);
    socket.broadcast.emit('chat-message', data);
  });
  socket.on('chat-message', (data) => {
    console.log('chat message', data);
    socket.broadcast.emit('chat-message', data);
  });

  socket.on('feedback', (data) => {
    console.log('feedback', data);
    socket.broadcast.emit('feedback', data);
  });
}
