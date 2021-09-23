const app = require('express')();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const { addUser, getUser, deleteUser, getUsers } = require('./users');
const { addRoom, getRoom, deleteRoom, getRooms } = require('./rooms');
const { addSettings, setSettings, getSettings } = require('./settings');
const {
  addIssue,
  getIssue,
  deleteIssue,
  getIssues,
  updateIssues
} = require('./issues');
const {
  getTimer,
  addTimer,
  addTimerStatus,
  getTimerStatus
} = require('./timer');

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

  socket.on('addTimer', ({ currentCount, room }) => {
    addTimer(currentCount, room);
    io.in(room).emit('timers', getTimer(room));
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
    }
  });

  socket.on('deleteUser', (id) => {
    const user = deleteUser(id);
    if (user) {
      io.in(user.room).emit('users', getUsers(user.room));
      io.to(user.id).emit('userIsDeleted');
    }
    console.log('User disconnected');
  });

  socket.on('addSettingsRoom', ({ room }, callback) => {
    const { error } = addSettings(room);
    if (error) return callback(error);
    io.in(room).emit('getSettings', getSettings(room));
    callback();
  });

  socket.on('setSettings', ({ currentSettings }) => {
    const settings = setSettings(currentSettings);
    io.in(settings.room).emit('getSettings', getSettings(settings.room));
  });

  socket.on('leaveSession', (id) => {
    const deletedUser = getUser(id);
    const user = deleteUser(deletedUser.idd);
    if (user) {
      socket.in(user.room).emit('users', getUsers(user.room));
    }
    console.log('User disconnected');
  });

  socket.on('changePage', ({ link, room }) => {
    socket.in(room).emit('link');
  });

  socket.on('setTimerStatus', (status, room) => {
    addTimerStatus(status, room);
    io.in(room).emit('getTimerStatus', getTimerStatus(room));
  });

  // socket.on('changeLink', ({ link, room }) => {
  //   io.in(room).emit('link', changeLink('/game-member', room));
  // });
});

app.get('/', (req, res) => {
  res.send('Server is up and running');
});

http.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
