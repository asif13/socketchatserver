/**
 * Created by asifjunaid on 3/3/16.
 */
var usernames = {};
var numUsers = 0;
module.exports = function (sock) {
    // when the client emits 'add user', this listens and executes
    sock.on('add user', function (username) {
        console.log('user added');

        // we store the username in the socket session for this client
        sock.username = username;

        // add the client's username to the global list
        usernames[username] = username;
        ++numUsers;
        addedUser = true;
        sock.emit('login', {
            numUsers: numUsers
        });
        // echo globally (all clients) that a person has connected
        sock.broadcast.emit('user joined', {
            username: sock.username,
            numUsers: numUsers
        });
    });


    return function (username) {

    };
};