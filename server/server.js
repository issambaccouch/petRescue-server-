const express = require('express');
const apiroutes = require('./routes');
var https = require('https');

var db = require('./models');
var fs = require('fs');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.json());

app.use('/petrescue', apiroutes);
app.use(express.static(__dirname +'/public/img'));
db.sequelize.sync().then(function() {
    app.listen(process.env.PORT || "3000", () => { 

        console.log("Server is running on port : ${process.env.PORT || '3000'}");
    });
  });

  /*var options = {
    key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
    cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
  };
  
  // Create an HTTPS service identical to the HTTP service.
  https.createServer(options, app).listen(443);
*/

  /////////////////////////////// Message ////////////////////////////////
// SOCKET IO 


  io.on('connection',function(socket) {
    console.log(socket.id);
  console.log('User connection');

  socket.on('connect user', function(user){
    console.log("Connected user :")
    io.emit('connect user',user);
  });

  socket.on('on typing', function(typing)
  {
    console.log('typing ...');
    io.emit('on typing',typing);
  });

  socket.on('chat message', function(msg) {
    console.log('Message '+msg['message']);
    io.emit('chat message', msg);
  });
  socket.on('message',function(data){
    Object.keys(io.sockets.sockets).forEach(function(sock){
      if(sock =- socket.id)
      {
        io.to(sock).emit('message',data);

      }
    })
  })
  socket.on('disconnect', function(){
    console.log('user disconnected '+socket.id);
  })
});






/*
io.on('connection', (socket) => {

  console.log('user connected')
  
  socket.on('join', function(userNickname) {
  
          console.log(userNickname +" : has joined the chat "  )
  
          socket.broadcast.emit('userjoinedthechat',userNickname +" : has joined the chat ")
      });
  


  socket.on('messagedetection', (senderNickname,messageContent) => {

    //log the message in console 

    console.log(senderNickname+" :" +messageContent)
     //create a message object

   let  message = {"message":messageContent, "senderNickname":senderNickname}
    let addMessage = {"message":messageContent, "senderNickname":senderNickname}
// send the message to the client side  

    socket.emit('message', message )

   });
  });*/
