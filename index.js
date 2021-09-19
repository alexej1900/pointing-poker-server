const app = require('express')();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const { addUser, getUser, deleteUser, getUsers } = require('./users');
const { addRoom, getRoom, deleteRoom, getRooms } = require('./rooms');
const { addIssue, getIssue, deleteIssue, getIssues, updateIssues } = require('./issues');
const { addSettings, setSettings, getSettings} = require('./settings');

app.use(cors());

io.on('connection', (socket) => {
  io.in(socket).emit('rooms', getRooms());
  socket.on('login', ({ values, room }, callback) => {
    const { member, error } = addUser(socket.id, room, values);
    if (error) return callback(error);
    socket.join(member.room);
    io.in(room).emit('users', getUsers(room));
    io.in(room).emit('issues', getIssues(room));
    callback();
  });

  socket.on('getRooms', () => {
    io.emit('rooms', getRooms());
  });

  socket.on('addRoom', ({ currentRoom }, callback) => {
    const { roomItem, error } = addRoom(currentRoom);
    if (error) return callback(error);
    io.in(roomItem).emit('rooms', getRooms());
    callback();
  });

  socket.on('addIssue', ({ currentIssue, room }, callback) => {
    const { error } = addIssue(currentIssue, room);
    if (error) return callback(error);
    io.in(room).emit('issues', getIssues(room));
    callback();
  });

  socket.on('updateIssues', ({ currentIssue, room }, callback) => {
    updateIssues(currentIssue, room);
    io.in(room).emit('issues', getIssues(room));
    callback();
  });

  socket.on('deleteIssue', (id) => {
    const issue = deleteIssue(id);
    if (issue) {
      io.in(issue.room).emit('issues', getIssues(issue.room));
    };
  });

  socket.on('deleteUser', (id) => {
    const user = deleteUser(id);
    if (user) {
      io.in(user.room).emit('users', getUsers(user.room));
      io.to(user.id).emit('userIsDeleted');
    };
    console.log('User disconnected');
  });

  socket.on('addSettingsRoom', ({room}, callback) => {
    const {error} = addSettings(room);
    if (error) return callback(error);
    io.in(room).emit('getSettings', getSettings(room));
    callback();
  });

  socket.on('setSettings', ({currentSettings}) => {
    const settings = setSettings(currentSettings);
    io.in(settings.room).emit('getSettings', getSettings(settings.room));
  });
});

app.get('/', (req, res) => {
    res.send('Server is up and running');
});

http.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
});
