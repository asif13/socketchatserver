/**
 * Created by asifjunaid on 3/3/16.
 */
var bunyan = require('bunyan'),
    cfg = require('./cfg'),

    log = bunyan.createLogger({name: cfg.appname, level: 'trace'});

module.exports = log;
