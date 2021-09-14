"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var issues = [{
  room: 10,
  id: '1',
  name: 'issue 12',
  link: ' http://jira.my-company.com/issue-12',
  priority: 'middle'
}, {
  room: 10,
  id: '2',
  name: 'issue 13',
  link: ' http://jira.my-company.com/issue-13',
  priority: 'low'
}, {
  room: 10,
  id: '3',
  name: 'issue 14',
  link: ' http://jira.my-company.com/issue-14',
  priority: 'height'
}];

var addIssue = function addIssue(issue, room) {
  var existingIssue = issues.find(function (issuei) {
    return issuei.name === issue.name;
  });
  if (existingIssue) return {
    error: "Issue has already been taken"
  };
  if (!issue) return {
    error: "Issue are required"
  };

  var issueItem = _objectSpread({
    room: room
  }, issue);

  issues.push(issueItem);
  return {
    issueItem: issueItem
  };
};

var updateIssues = function updateIssues(currentIssue, room) {
  issues = issues.map(function (issue) {
    return issue.id === currentIssue.id ? _objectSpread({
      room: room
    }, currentIssue) : issue;
  });
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
  updateIssues: updateIssues
};