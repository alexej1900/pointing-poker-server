const initialSettings = {
  isMaster: false,
  isChanging: false,
  isTimer: false,
  scoreType: '',
  minutes: 0,
  seconds: 0,
};

let settings = [];

const addSettings = (room) => {
  const existingRoom = settings.find(setting => setting.room === room);
  if (existingRoom) return { error: 'Room has already been taken' };
  if (!room) return { error: 'Room are required' };
  const currentSettings = {...initialSettings, room: room};
  settings.push(currentSettings);
  return { currentSettings };
}

const setSettings = (currentSettings) => {
  settings = settings.map((settingsItem) => {
    return settingsItem.room === currentSettings.room 
      ? currentSettings
      : settingsItem
  });
  return currentSettings;
}

const getSettings = (currentRoom) => settings.filter(setting => setting.room === currentRoom)[0];

module.exports = { addSettings, setSettings, getSettings };
