var socket = io();

//-----listners-----\\
socket.on('connect', function() {
    console.log('connected to server');    
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    console.log('New message recieved', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from} (${formattedTime}): ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from} (${formattedTime}): `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

//-----jQuery codes-----\\
jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    var messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'user',
        text: messageTextBox.val()
    }, function(data){
        messageTextBox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser.');
    }
    
    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Share location');
    }, function () {
        alert('Unable to fetch the location.');
        locationButton.removeAttr('disabled').text('Share location');
    });
});