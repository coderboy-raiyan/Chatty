/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
const app = require('express')();
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const port = process.env.PORT || 5000;
const routes = require('./routes/index');
const connectDb = require('./db/connectDb');
const errorHandler = require('./middleware/error');

app.use(express.json());
app.use(cors());
// db connect
connectDb();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket) => {
    // console.log(socket.id);

    socket.on('setup', (userData) => {
        socket.join(userData._id);
        socket.emit('connection');
    });

    socket.on('join_chat', (room) => {
        socket.join(room);
        console.log(`User joined room ${room}`);
    });

    socket.on('typing', (selectedChat, user) => {
        selectedChat.users.forEach((u) => {
            if (u._id === user._id) return;

            socket.in(u._id).emit('typing');
        });
    });
    socket.on('stop_typing', (selectedChat, user) => {
        selectedChat.users.forEach((u) => {
            if (u._id === user._id) return;

            socket.in(u._id).emit('stop_typing');
        });
    });

    socket.on('new_message', (newMessageReceived) => {
        const { chat } = newMessageReceived;
        if (!chat.users) console.log('chat.users is not defined');

        chat.users.forEach((user) => {
            // eslint-disable-next-line no-useless-return
            if (user._id === newMessageReceived.sender._id) return;

            socket.in(user._id).emit('message_received', newMessageReceived);
        });
    });

    socket.off('setup', (userData) => {
        console.log('USER DISCONNECTED');
        socket.leave(userData._id);
    });
});

app.get('/', (req, res) => {
    res.send('hello world');
});

// all routes
app.use('/api', routes);

// error handler middleware

app.use(errorHandler);

server.listen(port, () => {
    console.log('listen on port....');
});
