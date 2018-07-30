const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isValidString } = require('./utils/validate');
const { Users } = require('./utils/users');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));

const server = http.createServer(app);
const io = socketIO(server);

let users = new Users();

io.on('connection', socket => {
    socket.on('join', (params, callback) => {
        if(!isValidString(params.name) || !isValidString(params.room)) {
            return callback('Need both User name and Room name');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUsersList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        let user = users.getUser(socket.id);

        if(user && isValidString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }

        callback();
    });

    socket.on('createLocationMessage', message => {
        let user = users.getUser(socket.id);

        if(user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, message.latitude, message.longitude));
        }
    });

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });
});

server.listen(port, ()=> {
    console.log('Server up on port', port);
})