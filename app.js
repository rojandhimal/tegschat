const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const { sequelize } = require('./models');
const apiRoute = require('./routes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/v1', apiRoute);

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

  socket.on('joinPrivateRoom', (data) => {
    // Join a private chat room based on the roomId
    socket.join(data.roomId);
  });

  socket.on('privateMessage', (data) => {
    // Send a private message to the specified room
    console.log('private chat:', data);
    io.to(data.roomId).emit('privateMessage', {
      message: data.message,
      sender: socket.id,
    });
  });
}
