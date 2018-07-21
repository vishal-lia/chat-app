const socket = io();

socket.on('connect', () => {
    console.log('Connected to Server');

    socket.emit('createMessage', {
        'from': 'Kunnu',
        'text': 'Hello..'
    });
});

socket.on('newMessage', message => {
    console.log('New message:', message);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});