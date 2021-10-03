"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialSettings = {
  isMaster: false,
  isChanging: false,
  isTimer: false,
  scoreType: '',
  minutes: 0,
  seconds: 0,
  isGame: false
};
var settings = [];

var addSettings = function addSettings(room) {
  var existingRoom = settings.find(function (setting) {
    return setting.room === room;
  });
  if (existingRoom) return {
    error: 'Room has already been taken'
  };
  if (!room) return {
    error: 'Room are required'
  };

  var currentSettings = _objectSpread({}, initialSettings, {
    room: room
  });

  settings.push(currentSettings);
  return {
    currentSettings: currentSettings
  };
};

var setSettings = function setSettings(currentSettings) {
  settings = settings.map(function (settingsItem) {
    return settingsItem.room === currentSettings.room ? currentSettings : settingsItem;
  });
  return currentSettings;
};

var setIsGameSetting = function setIsGameSetting(room, isGame) {
  settings = settings.map(function (settingsItem) {
    return settingsItem.room === room ? _objectSpread({}, settingsItem, {
      isGame: isGame
    }) : settingsItem;
  });
};

var getSettings = function getSettings(currentRoom) {
  return settings.filter(function (setting) {
    return setting.room === currentRoom;
  })[0];
};

module.exports = {
  addSettings: addSettings,
  setSettings: setSettings,
  getSettings: getSettings,
  setIsGameSetting: setIsGameSetting
};