const rooms = []

const addRoom = (id, room) => {
    const existingRoom = rooms.find(roomi => roomi.id.trim().toLowerCase() === room.id.trim().toLowerCase())

    if (existingRoom) return { error: "Room has already been taken" }
    if (!room) return { error: "Room are required" }

    const roomItem = { id, room }
    rooms.push(roomItem)
    return { roomItem }
}

const getRoom = id => {
    let room = rooms.find(room => room.id == id)
    return room
}

const deleteRoom = (id) => {
    const index = rooms.findIndex((room) => room.id === id);
    if (index !== -1) return rooms.splice(index, 1)[0];
}

const getRooms = () => rooms

module.exports = { addRoom, getRoom, deleteRoom, getRooms }