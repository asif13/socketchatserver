/**
 * Created by asifjunaid on 3/3/16.
 */

module.exports = function(sock) {
    sock.on('new message', function (data) {
        // we tell the client to execute 'new message'
        sock.broadcast.emit('new message', {
            username: sock.username,
            message: data,
            timestamp: Date.now()
        });
        console.log('I sent it');
    });
    return function ()
    {

    }
}