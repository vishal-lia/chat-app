const socket = io();

socket.on('connect', () => {
    console.log('Connected to Server');
});

socket.on('newMessage', message => {
    console.log('New message:', message);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});