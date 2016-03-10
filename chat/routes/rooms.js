/**
 * Created by asifjunaid on 3/8/16.
 */

var roomModel = require('../schema').roomModel,

        geolib = require('geolib'),

        _ = require('lodash'),

         assert = require('assert');


exports.findAllRooms = function(){

    var cursor =  roomModel.find();

    cursor.each(function(err,doc){

       assert.equal(err,null);

        if (doc != null) {

            console.log(doc);

        }

    });

};

exports.addRoom = function(req,res){

    console.log("came here");

    var room = req.body;

    new roomModel({

        latitude:room["latitude"],

        longitude:room["longitude"],

        span:room["span"]

    }).save(function(err){

        if (err){

            res.statusCode = 404;

            res.json({"error":"could not save"});

            console.log("could not save");

        }else{

            console.log("room created");

            res.json(res.statusCode);

        }

    });

};

exports.addUserToARoom = function(user){
   //var  user = req.body;
    var array2 = [user['latitude'],user['longitude']];

    var isUserAssignedARoom = false;

    roomModel.find().lean().exec(function (err, docs) {

        var length = docs.length;

        for (i = 0;i<length;i++){

            console.log(docs[i]["latitude"]);

                var latitude = docs[i]["latitude"];

                var longitude = docs[i]["longitude"];

                var array1 = [latitude,longitude];

                var distance = geolib.getDistance(array1,array2);

                console.log(distance);

                /*
                * if the distance between the user and center of a room is less than 10 km than assign the user to that
                * room
                * */
                var id = docs[i]["_id"];
                if (distance < 10000) {
                     roomModel.update({ "_id": docs[i]["_id"] },

                        {

                            $push: { "users": user["username"] }},

                            function(err) {

                                if(err) {

                                    console.log("error")
                                    return nil;
                                }

                                else {

                                    console.log("user inserted");

                                    isUserAssignedARoom = true;
                                    //var id = docs[i]["_id"];
                                    return id;
                                }

                        });
                }
        }

        /*
        * If a user has not been assigned a room yet , create a room , with its center to be the users current location .
        *
        */

        if (isUserAssignedARoom == false){

              new roomModel({

                  latitude : user['latitude'],

                  longitude : user['longitude'],

                  span : "10",

                  $push :{"users":user["username"]}

              }).save(function(err,id){

                    if (err){

                        console.log("could note create rooms");
                        return nil;
                    }

                  else

                    {

                        console.log("room created");
                        return id;

                    }

              })
        }

    });

};

