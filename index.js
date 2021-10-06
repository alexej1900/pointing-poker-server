const app = require('express')();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const {
  addUser,
  getUser,
  deleteUser,
  getUsers,
  addDeleteUser,
  editUser,
  deleteUsers
} = require('./users');
const { addRoom, getRoom, deleteRoom, getRooms } = require('./rooms');
const {
  addSettings,
  setSettings,
  getSettings,
  setIsGameSetting
} = require('./settings');

const {
  addIssue,
  getIssue,
  deleteIssue,
  getIssues,
  updateIssues,
  addIssueStat
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

  socket.on('updateIssue', ({ issue, room }, callback) => {
    updateIssues(issue, room);
    io.in(room).emit('issues', getIssues(room));
    callback();
  });

  socket.on('addIssueStatistic', (props) => {
    const { finalArr, room } = props;
    addIssueStat({ finalArr, room });
    io.in(room).emit('issues', getIssues(room));
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

  socket.on('finishSession', ({ room }, callback) => {
    const { error } = deleteRoom(room);
    if (error) return callback(error);
    deleteUsers(room);
    io.in(room).emit('endOfSession');
    console.log('Session is finished');
    callback();
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

  socket.on('getCurrentSettings', (room) => {
    io.in(room).emit('getSettings', getSettings(room));
  });

  socket.on('getCurrentMemberSettings', ({ room, id }) => {
    io.to(id).emit('getMemberSettings', getSettings(room));
  });

  socket.on('leaveSession', (id) => {
    const deletedUser = getUser(id);
    const user = deleteUser(deletedUser.idd);
    if (user) {
      socket.in(user.room).emit('users', getUsers(user.room));
    }
    console.log('User disconnected');
  });

  socket.on('changePage', ({ room, isGame }) => {
    setIsGameSetting(room, isGame);
    socket.in(room).emit('link', getSettings(room));
  });

  socket.on('watchStat', ({ room }) => {
    io.in(room).emit('endGame');
  });

  socket.on('setTimerStatus', (status, room) => {
    addTimerStatus(status, room);
    io.in(room).emit('getTimerStatus', getTimerStatus(room));
  });

  socket.on('setRestart', (status, room) => {
    io.in(room).emit('restarted', status);
  });

  socket.on('voting', ({ deletedUser, kickerId, vote, voteSet }) => {
    const membersCount = getUsers(deletedUser.room).length;
    const deletedMember = addDeleteUser(deletedUser, kickerId, vote, voteSet);
    if (membersCount <= deletedMember.kickers.length) {
      let yes = 0;
      let no = 0;
      deletedMember.kickers.forEach((item) => {
        item.vote ? yes++ : no++;
      });
      if (yes > no) {
        const user = deleteUser(deletedUser.idd);
        if (user) {
          io.in(user.room).emit('users', getUsers(user.room));
          io.to(user.id).emit('userIsDeleted');
        }
        console.log('User disconnected');
      } else {
        console.log('User stayed in session');
      }
    }
  });

  socket.on('kickUser', ({ id, kickerId, voteSet }) => {
    const deletedUser = getUser(id);
    const kicker = getUser(kickerId);
    if (deletedUser && kicker) {
      io.in(kicker.room).emit('willPlayerKick', {
        deletedUser,
        kicker,
        voteSet
      });
    }
  });
  socket.on('sendMessage', (message) => {
    const user = getUser(socket.id);
    console.log('user: ' + user.fullName);
    io.in(user.room).emit('message', { user: user.fullName, text: message });
  });

  socket.on('getUser', ({ room }) => {
    const user = getUser(socket.id);
    io.in(room).emit('getCurrentUser', getUser(socket.id));
  });

  socket.on('editUser', ({ room, image }) => {
    const user = editUser(socket.id, image);
    io.in(user.room).emit('users', getUsers(user.room));
  });
});

app.get('/', (req, res) => {
  res.send('Server is up and running');
});

http.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
