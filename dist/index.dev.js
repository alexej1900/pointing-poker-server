"use strict";

var app = require('express')();

var http = require('http').createServer(app);

var io = require('socket.io')(http);

var cors = require('cors');

var PORT = process.env.PORT || 5000;

var _require = require('./users'),
    addUser = _require.addUser,
    getUser = _require.getUser,
    deleteUser = _require.deleteUser,
    getUsers = _require.getUsers;

app.use(cors());
io.on('connection', function (socket) {
  socket.on('login', function (_ref, callback) {
    var values = _ref.values,
        room = _ref.room;

    var _addUser = addUser(socket.id, room, values),
        member = _addUser.member,
        error = _addUser.error;

    if (error) return callback(error);
    socket.join(member.room);
    socket["in"](room).emit('notification', {
      title: 'Someone\'s here',
      description: "".concat(member.fullName, " just entered the room")
    });
    io["in"](room).emit('users', getUsers(room));
    callback();
  }); // socket.on('sendMessage', message => {
  //     const user = getUser(socket.id)
  //     io.in(user.room).emit('message', { user: user.fullName, text: message });
  // })

  socket.on("deleteUser", function (id) {
    console.log("User disconnected");
    var user = deleteUser(id);

    if (user) {
      io["in"](user.room).emit('notification', {
        title: 'Someone just left',
        description: "".concat(user.fullName, " just left the room")
      });
      io["in"](user.room).emit('users', getUsers(user.room));
    }

    ;
  });
});
app.get('/', function (req, res) {
  res.send("Server is up and running");
});
http.listen(PORT, function () {
  console.log("Listening to ".concat(PORT));
});