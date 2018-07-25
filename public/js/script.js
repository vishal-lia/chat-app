const socket = io();

socket.on('connect', () => {
    console.log('Connected to Server');
});

socket.on('newMessage', message => {
    console.log('New message:', message);

    let li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

socket.on('newLocationMessage', message => {
    let li = $('<li></li>');
    let a = $('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);

    $('#messages').append(li);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

$('#message-form').on('submit', e => {
    e.preventDefault();
    let messageTextbox = $('[name=message]');

    socket.emit('createMessage', {
        'from': 'User',
        'text': messageTextbox.val()
    }, () => {
        messageTextbox.val('');
    });
});

let locationButton = $('#send-location');
locationButton.on('click', () => {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by you browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending...');

    navigator.geolocation.getCurrentPosition(position => {
        socket.emit('createLocationMessage', {
            'latitude': position.coords.latitude,
            'longitude': position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Send Location');        
    }, () => {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location');
    });
});