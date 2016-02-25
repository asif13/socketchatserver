var mongoose = require('mongoose');

//creating schema
var userSchema = mongoose.Schema({username:String});
var chatSchema = mongoose.Schema({userId:String,chatMessage:String});

//creating model
var userModel = mongoose.model('user',userSchema);
var chatModel = mongoose.model('chat',chatSchema);

//exports
exports.userModel = userModel;
exports.chatModel = chatModel;