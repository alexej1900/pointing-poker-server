"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var issues = [];

var addIssue = function addIssue(currentIssue, room) {
  var existingIssue = issues.find(function (issuei) {
    return issuei.id === currentIssue.id;
  });
  if (existingIssue) return {
    error: 'Issue has already been taken'
  };

  var issueItem = _objectSpread({
    room: room
  }, currentIssue);

  issues.push(issueItem);
  return {
    issueItem: issueItem
  };
};

var updateIssues = function updateIssues(currentIssue, room) {
  issues = issues.map(function (issue) {
    issue.isActive = false;
    return issue.id === currentIssue.id ? _objectSpread({
      room: room
    }, currentIssue) : issue;
  });
};

var addIssueStat = function addIssueStat(_ref) {
  var finalArr = _ref.finalArr,
      room = _ref.room,
      statCards = _ref.statCards;
  var voteNumber = statCards.length;
  issues.forEach(function (issue) {
    if (issue.isActive) {
      issue.statistic = Array.apply(void 0, _toConsumableArray(finalArr));
      issue.votes = voteNumber;
    } else {
      issue = issue;
    }
  });
  return issues;
};

var getIssue = function getIssue(id) {
  var issue = issues.find(function (issue) {
    return issue.id === id;
  });
  return issue;
};

var deleteIssue = function deleteIssue(id) {
  var index = issues.findIndex(function (issue) {
    return issue.id === id;
  });
  if (index !== -1) return issues.splice(index, 1)[0];
};

var getIssues = function getIssues(room) {
  return issues.filter(function (issue) {
    return issue.room === room;
  });
};

module.exports = {
  addIssue: addIssue,
  getIssue: getIssue,
  deleteIssue: deleteIssue,
  getIssues: getIssues,
  updateIssues: updateIssues,
  addIssueStat: addIssueStat
};