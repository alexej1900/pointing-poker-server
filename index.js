const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const { addUser, getUser, deleteUser, getUsers } = require('./users');
const { addRoom, getRoom, deleteRoom, getRooms } = require('./rooms');
const { addIssue, getIssue, deleteIssue, getIssues, updateIssues } = require('./issues');

app.use(cors());

io.on('connection', (socket) => {
  io.in(socket).emit('rooms', getRooms());
  socket.on('login', ({ values, room }, callback) => {
    const { member, error } = addUser(socket.id, room, values);
    if (error) return callback(error);
    socket.join(member.room);
    socket.in(room).emit('notification', { 
      title: 'Someone\'s here', 
      description: `${member.fullName} just entered the room`,
    });
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

    // socket.on('sendMessage', message => {
    //     const user = getUser(socket.id)
    //     io.in(user.room).emit('message', { user: user.fullName, text: message });
    // })

  socket.on("deleteIssue", (id) => {
    const issue = deleteIssue(id);
    if (issue) {
      io.in(issue.room).emit('issues', getIssues(issue.room));
    };
  });

  socket.on("deleteUser", (id) => {
    const user = deleteUser(id);
    if (user) {
      io.in(user.room).emit('users', getUsers(user.room));
    };
    console.log("User disconnected");
  });
});

app.get('/', (req, res) => {
    res.send("Server is up and running");
});

http.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
});
