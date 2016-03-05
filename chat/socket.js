/**
 * Created by asifjunaid on 3/3/16.
 */
var socketio = require('socket.io'),
    cfg = require('./cfg'),
    log = require('./log');

module.exports = function (app) {
    var io = socketio(app),
        nsp = io.of(cfg.namespace), // custom namespace for chat
        socks = {};
    function sockById(id) {
        return socks[id];
    }

    io.on('connection', function (sock) {
        log.trace('New conn: %s', sock.id);
        socks[sock.id] = sock;

        sock.on('adduser', require('./events/adduser')(sock));
        //sock.on('new_conv', require('./events/new_conv')(sock));
        //sock.on('new_msg', require('./events/new_msg')(sock, sockById));
        //sock.on('msg_receipt', require('./events/msg_receipt')(sock));
        //sock.on('conv_history', require('./events/conv_history')(sock, sockById));
        //sock.on('conv_msgs', require('./events/conv_msgs')(sock));
        //sock.on('conv_meta', require('./events/conv_meta')(sock));
        //sock.on('disconnect', require('./events/disconnect')(sock));
    });

    return nsp;
};