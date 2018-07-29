const socket = io();

function scrollToBottom() {
    // Selectors
    let messages = $('#messages');
    let newMessage = messages.children('li:last-child');

    // Heights
    let scrollTop = messages.prop('scrollTop');
    let clientHeight = messages.prop('clientHeight');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    console.log('DEBUG: ', scrollTop, clientHeight, scrollHeight, newMessageHeight, lastMessageHeight);
    if(scrollTop + clientHeight + lastMessageHeight + newMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

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
    scrollToBottom();
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
    scrollToBottom();
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