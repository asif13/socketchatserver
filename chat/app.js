/**
 * Created by asifjunaid on 3/3/16.
 */
var cfg = require('./cfg'),
    log = require('./log'),
    expressapp = require('./server_new'),
    http = require('http').Server(expressapp);

require('./socket')(http);

http.listen(cfg.port, function (err) {
    if (err) {
        log.fatal(err);
        process.exit(1);
    }
    log.info('User chat service started on port %d', cfg.port);
});
