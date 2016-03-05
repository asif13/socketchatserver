/**
 * Created by asifjunaid on 3/3/16.
 */
var socketio = require('socket.io'),
    cfg = require('./cfg'),
    log = require('./log');


module.exports = function() {
    socket.on('add user', function (username) {
        console.log('user added')
        // we store the username in the socket session for this client
        socket.username = username;
        console.log(socket.username)

        // add the client's username to the global list
        usernames[username] = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
    });
}