const users = [
  {
    id: '',
    room: 10,
    firstName: 'David',
    lastName: 'Blane',
    jobPosition: "senior software engineer",
    fullName: "David Blane",
    imageSrc: '',
    idd: '1321242354325',
    isObserver: false,
    isMaster: false,
  },
]

const addUser = (id, room, user) => {
  const existingUser = users.find(useri => useri.idd.trim().toLowerCase() === user.idd.trim().toLowerCase());

  if (existingUser) return { error: "Username has already been taken" };
  if (!user && !room) return { error: "Username and room are required" };
  if (!user.fullName) return { error: "Username is required" };
  if (!room) return { error: "Room is required" };

  const member = { id, room, ...user };
  users.push(member);
  return { member };
}

const getUser = id => {
  let user = users.find(user => user.id === id);
  return user;
}

const deleteUser = (id) => {
  const index = users.findIndex((user) => user.idd === id);
  if (index !== -1) return users.splice(index, 1)[0];
}

const getUsers = (room) => users.filter(user => user.room === room);

module.exports = { addUser, getUser, deleteUser, getUsers };
