var mongoose = require('mongoose');

//creating schema
var userSchema = mongoose.Schema({username:String,password:String,latitude:String,longitude:Number,isSignedIn:Number});
var chatSchema = mongoose.Schema({userId:String,recieverId:String,chatMessage:String,timestamp:String});

//creating model
var userModel = mongoose.model('user',userSchema);
var chatModel = mongoose.model('chat',chatSchema);

//exports
exports.userModel = userModel;
exports.chatModel = chatModel;

