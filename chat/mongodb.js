/**
 * Created by asifjunaid on 3/6/16.
 */
var mongoose = require('mongoose');
var mongoUrl = "localhost:27017/chatDb";
mongoose.connect(mongoUrl);
exports.mongoose = mongoose;