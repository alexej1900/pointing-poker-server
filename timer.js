const timers = [];

const addTimer = (currentCount, room) => {
  if (!currentCount) return { error: 'Issue are required' };
  const countItem = { room: room, currentCount: currentCount };
  timers.push(countItem);
  return { countItem };
};

const getTimer = (room) => {
  let timer = timers.find((timer) => timer.room === room);
  return timer;
};

module.exports = { addTimer, getTimer };
