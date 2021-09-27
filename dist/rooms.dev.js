"use strict";

var rooms = [];

var addRoom = function addRoom(currentRoom) {
  var existingRoom = rooms.find(function (roomItem) {
    return roomItem === currentRoom;
  });
  if (existingRoom) return {
    error: 'Room has already been taken'
  };
  if (!currentRoom) return {
    error: 'Room are required'
  };
  rooms.push(currentRoom);
  return {
    currentRoom: currentRoom
  };
};

var getRoom = function getRoom(id) {
  var room = rooms.find(function (room) {
    return room.id == id;
  });
  return room;
};

var deleteRoom = function deleteRoom(id) {
  var index = rooms.findIndex(function (room) {
    return room === id;
  });

  if (index !== -1) {
    return rooms.splice(index, 1)[0];
  } else {
    return {
      error: 'Room is not exist'
    };
  }

  ;
};

var getRooms = function getRooms() {
  return rooms;
};

module.exports = {
  addRoom: addRoom,
  getRoom: getRoom,
  deleteRoom: deleteRoom,
  getRooms: getRooms
};