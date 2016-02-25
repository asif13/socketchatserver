
  var express = require('express');
  var app = express();
  var server = require('http').Server(app);
  var io = require('socket.io')(server);
  var port = process.env.PORT || 80;
  var userRoute = require('./routes/user');
  var mongoose = require('mongoose');
  var mongoUrl = "localhost:27017/chatDatabase";
  var bodyParser = require('body-parser');

  mongoose.connect(mongoUrl);


  // Routing
  app.use('/js',  express.static(__dirname + '/public/js'));
  app.use('/css', express.static(__dirname + '/public/css'));
  app.use(express.static(__dirname + '/public'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  // Chatroom
  
  // usernames which are currently connected to the chat
  var usernames = {};
  var numUsers = 0;

  //Socket module
  io.on('connection', function (socket) {
    var addedUser = false;
  console.log('connection on ----')
    // when the client emits 'new message', this listens and executes
    socket.on('new message', function (data) {
      // we tell the client to execute 'new message'
      socket.broadcast.emit('new message', {
        username: socket.username,
        message: data,
        timestamp: Date.now()
      });
      console.log('I sent it');
    });
  
    // when the client emits 'add user', this listens and executes
    socket.on('add user', function (username) {
      console.log('user added')
      // we store the username in the socket session for this client
      socket.username = username;
      console.log(socket.username )

      // add the client's username to the global list
      usernames[username] = username;
      ++numUsers;
      addedUser = true;
      socket.emit('login', {
        numUsers: numUsers
      });
      // echo globally (all clients) that a person has connected
      socket.broadcast.emit('user joined', {
        username: socket.username,
        numUsers: numUsers
      });
    });
  
    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', function () {
      socket.broadcast.emit('typing', {
        username: socket.username
      });
    });
  
    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', function () {
      socket.broadcast.emit('stop typing', {
        username: socket.username
      });
    });
  
    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
      // remove the username from global usernames list
      if (addedUser) {
        delete usernames[socket.username];
        --numUsers;
  
        // echo globally that this client has left
        socket.broadcast.emit('user left', {
          username: socket.username,
          numUsers: numUsers
        });
      }
    });
  });

// app routes 
var router = express.Router();
app.use('/api', router);

// router.post('/user', function(req, res) {
//   console.log(req);
//   formBody(req, {}, send)

//     res.json({ message: 'hooray! welcome to our api!' });   
// });

router.post('/usersLastId',userRoute.getLastDocumentId);


router.post('/user',userRoute.insertUser);


// server.listen(8080);
server.listen(2015);
  
