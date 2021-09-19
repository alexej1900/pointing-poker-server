"use strict";

var app = require('express')();

var path = require('path');

var http = require('http').createServer(app);

var io = require('socket.io')(http);

var cors = require('cors');

var PORT = process.env.PORT || 5000;

var _require = require('./users'),
    addUser = _require.addUser,
    getUser = _require.getUser,
    deleteUser = _require.deleteUser,
    getUsers = _require.getUsers;

var _require2 = require('./rooms'),
    addRoom = _require2.addRoom,
    getRoom = _require2.getRoom,
    deleteRoom = _require2.deleteRoom,
    getRooms = _require2.getRooms;

var _require3 = require('./settings'),
    addSettings = _require3.addSettings,
    setSettings = _require3.setSettings,
    getSettings = _require3.getSettings;

var _require4 = require('./issues'),
    addIssue = _require4.addIssue,
    getIssue = _require4.getIssue,
    deleteIssue = _require4.deleteIssue,
    getIssues = _require4.getIssues,
    updateIssues = _require4.updateIssues;

var _require5 = require('./timer'),
    getTimer = _require5.getTimer,
    addTimer = _require5.addTimer;

app.use(cors());
io.on('connection', function (socket) {
  io["in"](socket).emit('rooms', getRooms());
  socket.on('login', function (_ref, callback) {
    var values = _ref.values,
        room = _ref.room;

    var _addUser = addUser(socket.id, room, values),
        member = _addUser.member,
        error = _addUser.error;

    if (error) return callback(error);
    socket.join(member.room);
    io["in"](room).emit('users', getUsers(room));
    io["in"](room).emit('issues', getIssues(room));
    callback();
  });
  socket.on('getRooms', function () {
    io.emit('rooms', getRooms());
  });
  socket.on('addRoom', function (_ref2, callback) {
    var currentRoom = _ref2.currentRoom;

    var _addRoom = addRoom(currentRoom),
        roomItem = _addRoom.roomItem,
        error = _addRoom.error;

    if (error) return callback(error);
    io["in"](roomItem).emit('rooms', getRooms());
    callback();
  });
  socket.on('addIssue', function (_ref3, callback) {
    var currentIssue = _ref3.currentIssue,
        room = _ref3.room;

    var _addIssue = addIssue(currentIssue, room),
        error = _addIssue.error;

    if (error) return callback(error);
    io["in"](room).emit('issues', getIssues(room));
    callback();
  });
  socket.on('addTimer', function (_ref4) {
    var currentCount = _ref4.currentCount,
        room = _ref4.room;
    addTimer(currentCount, room);
    io["in"](room).emit('timers', getTimer(room));
  });
  socket.on('updateIssues', function (_ref5, callback) {
    var currentIssue = _ref5.currentIssue,
        room = _ref5.room;
    updateIssues(currentIssue, room);
    io["in"](room).emit('issues', getIssues(room));
    callback();
  });
  socket.on('deleteIssue', function (id) {
    var issue = deleteIssue(id);

    if (issue) {
      io["in"](issue.room).emit('issues', getIssues(issue.room));
    }
  });
  socket.on('deleteUser', function (id) {
    var user = deleteUser(id);

    if (user) {
      io["in"](user.room).emit('users', getUsers(user.room));
      io.to(user.id).emit('userIsDeleted');
    }

    ;
    console.log('User disconnected');
  });
  socket.on('addSettingsRoom', function (_ref6, callback) {
    var room = _ref6.room;

    var _addSettings = addSettings(room),
        error = _addSettings.error;

    if (error) return callback(error);
    io["in"](room).emit('getSettings', getSettings(room));
    callback();
  });
  socket.on('setSettings', function (_ref7) {
    var currentSettings = _ref7.currentSettings;
    var settings = setSettings(currentSettings);
    io["in"](settings.room).emit('getSettings', getSettings(settings.room));
  }); // socket.on('changeLink', ({ link, room }) => {
  //   io.in(room).emit('link', changeLink('/game-member', room));
  // });
});
app.get('/', function (req, res) {
  res.send('Server is up and running');
});
http.listen(PORT, function () {
  console.log("Listening to ".concat(PORT));
});