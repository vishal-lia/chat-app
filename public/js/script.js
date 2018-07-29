const socket = io();

socket.on('connect', () => {
    console.log('Connected to Server');
});

socket.on('newMessage', message => {
    let formattedDate = moment(message.createdAt).format('h:mm A');
    let template = $('#message-template').html();
    let rendered = Mustache.render(template, {
        from: message.from,
        createdAt: formattedDate,
        text: message.text
    });

    $('#messages').append(rendered);
});

socket.on('newLocationMessage', message => {
    let formattedDate = moment(message.createdAt).format('h:mm A');
    let template = $('#location-template').html();
    let rendered = Mustache.render(template, {
        from: message.from,
        createdAt: formattedDate,
        url: message.url
    });

    $('#messages').append(rendered);
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

    locationButton.css({'background-color': '#53486d' , 'color': '#fff'});
    locationButton.attr('disabled', 'disabled').text('Sending...');

    navigator.geolocation.getCurrentPosition(position => {
        socket.emit('createLocationMessage', {
            'latitude': position.coords.latitude,
            'longitude': position.coords.longitude
        });

        locationButton.css({'background-color': '#e7e7e7' , 'color': '#2e2346'});
        locationButton.removeAttr('disabled').text('Send Location');        
    }, () => {
        locationButton.css({'background-color': '#e7e7e7' , 'color': '#2e2346'});
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location');
    });
});