const timers = [];
let timersStatus = [];

const addTimer = (currentCount, room) => {
  if (!currentCount) return { error: 'Issue are required' };
  const countItem = { room: room, currentCount: currentCount };
  timers.push(countItem);
  return { countItem };
};

const getTimer = (room) => {
  let timer = timers.find((timer) => timer.room === room);
  if (timer) {
    return timer;
  } else {
    timer = { currentCount: 0 };
    return timer;
  }
};

const addTimerStatus = (currentStatus, room) => {
  const status = { room: room, currentStatus: currentStatus };
  timersStatus = [];
  timersStatus.push(status);
  return { status };
};
const getTimerStatus = (room) => {
  let timerStatus = timersStatus.find((timer) => timer.room === room);
  if (timerStatus) {
    return timerStatus;
  } else {
    timerStatus = { currentStatus: false };
    return timerStatus;
  }
};

module.exports = { addTimer, getTimer, addTimerStatus, getTimerStatus };
