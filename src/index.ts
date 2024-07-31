// import express from 'express';
// import cors from 'cors';
// import { createServer } from 'http';
// import { Server } from 'socket.io';
// import './socket'; // Ensure this file contains the socket.io setup
// import { routes } from './routes';

// const app = express();
// const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:5000'],
//     methods: ["GET", "POST"]
//   }
// });

// app.use(express.json());
// app.use(cors({
//   origin: ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:5000']
// }));

// routes(app);

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

// server.listen(8081, () => {
//   console.log('Server is running on port 8081');
// });

import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import './socket'; // This should be your socket logic file
import { routes } from './routes';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:5000'],
    methods: ["GET", "POST"]
  }
});

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:5000']
}));

routes(app);

// Example of setting up a basic socket connection
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listening for a message event from the client
  socket.on('message', (msg) => {
    console.log('Message received:', msg);
    // Broadcast the message to all connected clients
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(8081, () => {
  console.log('Server is running on port 8081');
});
