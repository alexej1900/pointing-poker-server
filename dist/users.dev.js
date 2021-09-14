"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var users = [{
  id: '',
  room: 10,
  firstName: 'David',
  lastName: 'Blane',
  jobPosition: "senior software engineer",
  fullName: "David Blane",
  imageSrc: '',
  idd: '1321242354325',
  isObserver: false,
  isMaster: false
}];

var addUser = function addUser(id, room, user) {
  var existingUser = users.find(function (useri) {
    return useri.idd.trim().toLowerCase() === user.idd.trim().toLowerCase();
  });
  if (existingUser) return {
    error: "Username has already been taken"
  };
  if (!user && !room) return {
    error: "Username and room are required"
  };
  if (!user.fullName) return {
    error: "Username is required"
  };
  if (!room) return {
    error: "Room is required"
  };

  var member = _objectSpread({
    id: id,
    room: room
  }, user);

  users.push(member);
  return {
    member: member
  };
};

var getUser = function getUser(id) {
  var user = users.find(function (user) {
    return user.id === id;
  });
  return user;
};

var deleteUser = function deleteUser(id) {
  var index = users.findIndex(function (user) {
    return user.idd === id;
  });
  if (index !== -1) return users.splice(index, 1)[0];
};

var getUsers = function getUsers(room) {
  return users.filter(function (user) {
    return user.room === room;
  });
};

module.exports = {
  addUser: addUser,
  getUser: getUser,
  deleteUser: deleteUser,
  getUsers: getUsers
};