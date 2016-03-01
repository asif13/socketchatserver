var userModel = require('../Schema').userModel;
var fs = require('fs');
var server = require('../server')

exports.insertUser = function(req,res){
	var user = req.body;
	console.log(user)
	new userModel({
		username:user["user"],

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
exports.signupUser = function(req,res){
	var user = req.body;
	var username = user["username"];
	console.log(user["username"]);
	userModel.findOne({username:username},function(err, docs){
		if(err){
			console.log(err);
			// return callback(err, null);
		}
		if (!err && docs){
			console.log(docs["password"]);
			if (docs["password"] == user["password"]){
				console.log("user logged in");
				res.json(res.statusCode);

			}
			else
			{
				console.log("bad user");
				new userModel({
					username:user["username"],
					password:user["password"],
					latitude:user["latitude"],
					longitude:user["longitude"]
				}).save(function(err){
					if (err){
						res.statusCode = 404;
						res.json({"error":"could not save"});
						console.log("could not save");
					}else{
						console.log("user signed up");
						res.json(res.statusCode);
					}
				})
			}
		}
		else{
			console.log("err");
		}
	});

}


exports.getLastDocumentId = function(){
	userModel.findOne().sort(username, 1).run(function(err, doc) {
   	    var max = doc.username;
     	console.log('getting last id');
     	console.log(max);
	});
}
