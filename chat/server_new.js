var express = require('express'),

    onResponse = require('on-response'),

    morgan = require('morgan'),

    log = require('./log'),

    bodyParser = require('body-parser'),

    app = express(),

    router = express.Router(),

    userRoute = require('./routes/user'),

    roomRoute = require('./routes/rooms'),

    mongoose = require('mongoose'),

    mongoUrl = "localhost:27017/chatDb";

mongoose.connect(mongoUrl);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.post('/signupUser',userRoute.signupUser);

//app.post('/addUserToARoom',roomRoute.addUserToARoom);

// Apache-style logging for all incoming requests (except static files above)

app.use(function (req, res, next) {

    onResponse(req, res, function () {

        // Default log level is 'debug'

        var level = 'debug';

        // If response status is 40X, log level becomes 'warn'
        if (res.statusCode >= 400 && res.statusCode < 500) {
            level = 'warn';
        }

        // If response status is 50X, log level becomes 'error'
        if (res.statusCode >=  500) {
            level = 'error';
        }

        log[level](
            '%s - %s [%s] "%s %s HTTP/%s" %s %s "%s" "%s"',
            morgan['remote-addr'](req, res),
            morgan['remote-user'](req, res),
            morgan.date(req, res, 'clf'),
            morgan.method(req, res),
            morgan.url(req, res),
            morgan['http-version'](req, res),
            morgan.status(req, res),
            morgan.res(req, res, 'content-length'),
            morgan.referrer(req, res),
            morgan['user-agent'](req, res)
        );
    });

    next();
});

// 400 handler
app.use(function (err, req, res, next) {
    if (err.status !== 400) {
        return next(err);
    }

    log.warn(err);
    res.status(400);
    res.json({
        error: 'Bad input data'
    });
});

// 403 handler
app.use(function (err, req, res, next) {
    if (err.status !== 403) {
        return next(err);
    }

    log.warn(err);
    res.status(403);
    res.json({
        error: 'Forbidden'
    });
});

// 500 handler
app.use(function (err, req, res, next) {
    if (err.status !== 500) {
        return next(err);
    }

    log.error(err);
    res.status(500);
    res.json({
        error: 'Internal server error'
    });
});

// 404 handler
app.use(function (req, res) {
    res.status(404);
    res.json({
        error: 'Resource not found'
    });
});

module.exports = app;
