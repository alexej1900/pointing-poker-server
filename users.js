const users = [];
let deletedUsersArray = [];

const addUser = (id, room, user) => {
  const existingUser = users.find(useri => useri.idd.trim().toLowerCase() === user.idd.trim().toLowerCase());

  if (existingUser) return { error: 'Username has already been taken' };
  if (!user && !room) return { error: 'Username and room are required' };
  if (!user.fullName) return { error: 'Username is required' };
  if (!room) return { error: 'Room is required' };

  const member = { id, room, ...user };
  users.push(member);
  return { member };
};

const getUser = id => {
  let user = users.find(user => user.id === id);
  return user;
};

const deleteUser = (id) => {
  const index = users.findIndex((user) => user.idd === id);
  if (index !== -1) return users.splice(index, 1)[0];
};

const addDeleteUser = (deletedUser, kickerId, vote, voteSet) => {
  const currKicker = kickerId;
  if (deletedUsersArray.length === 0) {
    const deletedMember = { 
      id: deletedUser.id, 
      voteSet: voteSet, 
      kickers: [{kickerId, vote}] 
    };
    deletedUsersArray.push(deletedMember);
  } else {
    deletedUsersArray = deletedUsersArray.map((user) => {
      if (user.id === deletedUser.id && user.voteSet === voteSet) {
        let kickers = user.kickers;
        const newKicker = {kickerId: currKicker, vote};
        kickers.push(newKicker);
        return {...user, kickers}
      } else {
        return user;
      }
    })  
  }
  if (!deletedUsersArray.find(
    element => 
    element.id === deletedUser.id && element.voteSet === voteSet)
  ) {
    const deletedMember = { id: deletedUser.id, voteSet: voteSet, kickers: [{kickerId, vote}] };
    deletedUsersArray.push(deletedMember);
  };
  console.log('deletedUsersArray', deletedUsersArray);

  return deletedUsersArray.filter((item)=> item.id === deletedUser.id && item.voteSet === voteSet)[0];
};

const getUsers = (room) => users.filter(user => user.room === room);

module.exports = { addUser, getUser, deleteUser, getUsers, addDeleteUser };
