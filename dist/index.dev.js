"use strict";

var app = require('express')();

var http = require('http').createServer(app);

var cors = require('cors');

var PORT = process.env.PORT || 5000; //Initialize new socket.io instance and pass the http server to it

var io = require('socket.io')(http);

app.use(cors());
io.on('connection', function (socket) {
  socket.on("login", function (_ref, callback) {
    var name = _ref.name,
        room = _ref.room;
  });
  socket.on("sendMessage", function (message) {});
  socket.on("disconnect", function () {});
});
app.get('/', function (req, res) {
  req.send('Server is up and running');
});
http.listen(PORT, function () {
  console.log("Listening to ".concat(PORT));
});