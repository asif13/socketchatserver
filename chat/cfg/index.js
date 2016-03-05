/**
 * Created by asifjunaid on 3/3/16.
 */
var defaults = {
    appname: 'local-chat',

    // Max messages per request when fetching conversation history
    'conversations.history.cap': 5,

    // Socket io namespace
    namespace: '/local-chat',

    // App will run on this port
    port: 8081
};

module.exports = defaults;
