const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const {Users} = require('./utils/users');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

//-----live connections-----\\
io.on('connection', (socket) => {
    console.log('New user connected.');

    

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)){
            return callback('Invalid information')
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUsersList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat room'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
        callback();
    });
    
    socket.on('createMessage', (message, callback) => {
        console.log(message);
        var user = users.getUser(socket.id);
        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback();
    });

    socket.on('createLocationMessage', (message) => {
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, message.latitude, message.longitude));
        }
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList', users.getUsersList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });
});


app.use(express.static(publicPath));

//-------requests-------\\


server.listen(port, () => console.log(`Server is running on port ${port}`));