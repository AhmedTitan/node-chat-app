var socket = io();

socket.on('connect', function() {
    console.log('connected to server');

    // socket.emit('createMessage', {
    //     from: 'ahmedraziklk@yahoo.com',
    //     message: 'Hello, Test email from the client side'
    // });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('New message recieved', message);
});