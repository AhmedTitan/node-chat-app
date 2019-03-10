const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//-----live connections-----\\
io.on('connection', (socket) => {
    console.log('New user connected.');
    
    socket.on('createMessage', (message) => {
        console.log('Broadcasting message');
        io.emit('newMessage', {
            from: message.from,
            message: message.message,
            timeStamp: new Date().getTime()
        });
    });

    socket.on('disconnect', () => console.log('user disconencted'));
});


app.use(express.static(publicPath));

//-------requests-------\\


server.listen(port, () => console.log(`Server is running on port ${port}`));