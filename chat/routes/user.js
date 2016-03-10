var userModel = require('../schema').userModel,

	roomModel = require('../schema').roomModel,

	roomRoute = require('./rooms'),

	fs = require('fs');

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

  	userModel.findOne({username:username},function(err, docs){

		if (!err && docs){

			console.log(docs["password"]);

			if (docs["password"] == user["password"]){

				console.log("user logged in");

				res.json(res.statusCode);

			}

			else{
				console.log("user logged in");

				res.json({"error":"incorrect password"});



			}

		}

			else

			{
				var roomId = roomRoute.addUserToARoom(user);
				if (roomId){
					new userModel({

						username:user["username"],

						password:user["password"],

						latitude:user["latitude"],

						longitude:user["longitude"],

						roomId:roomId

					}).save(function(err){

						if (err){

							res.statusCode = 404;

							res.json({"error":"could not save"});

							console.log("could not save");

						}else{

							console.log("user signed up");

							res.json(res.statusCode);


						}

					});

				}
				else{
					res.json({"error":"could not save"});

				}


			}
	});

}

