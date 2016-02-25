var userModel = require('../Schema').userModel;
var fs = require('fs');
var server = require('../server')

exports.insertUser = function(req,res){
	var user = req.body;
	console.log(user)
	new userModel({
		username:user["user"]
	}).save(function(err){
			
		if (err){
			console.log(err);
			res.statusCode = 404;
			res.json({"error":"could not save"});
		}else{
			console.log("user added");
			res.json(res.statusCode);
		}
	})
}

exports.getLastDocumentId = function(){
	userModel.findOne().sort(username, 1).run(function(err, doc) {
   	    var max = doc.username;
     	console.log('getting last id');
     	console.log(max);
	});
}
