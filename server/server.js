const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', socket => {
    console.log('New User connected');

    socket.on('createMessage', message => {
        console.log('Create message:', message);
        io.emit('newMessage', {
            'from': message.from,
            'text': message.text,
            'createdAt': new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, ()=> {
    console.log('Server up on port', port);
})