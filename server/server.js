const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//-----live connections-----\\
io.on('connection', (socket) => {
    console.log('New user connected.');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat room'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined to the channel'));
    
    socket.on('createMessage', (message, callback) => {
        console.log(message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('Message sent');
    });

    socket.on('createLocationMessage', (message) => {
        io.emit('newLocationMessage', generateLocationMessage('User', message.latitude, message.longitude));
    });

    socket.on('disconnect', () => console.log('user disconencted'));
});


app.use(express.static(publicPath));

//-------requests-------\\


server.listen(port, () => console.log(`Server is running on port ${port}`));