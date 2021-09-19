const rooms = [];

const addRoom = (currentRoom) => {
    const existingRoom = rooms.find(roomItem => roomItem === currentRoom);
    if (existingRoom) return { error: 'Room has already been taken' };
    if (!currentRoom) return { error: 'Room are required' };
    rooms.push(currentRoom);
    return { currentRoom };
};

const getRoom = (id) => {
    let room = rooms.find(room => room.id == id);
    return room;
};

const deleteRoom = (id) => {
    const index = rooms.findIndex((room) => room.id === id);
    if (index !== -1) return rooms.splice(index, 1)[0];
};

const getRooms = () => rooms;

module.exports = { addRoom, getRoom, deleteRoom, getRooms };
