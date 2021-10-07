let issues = [];

const addIssue = (currentIssue, room) => {
  const existingIssue = issues.find((issuei) => issuei.id === currentIssue.id);
  if (existingIssue) return { error: 'Issue has already been taken' };
  const issueItem = { room, ...currentIssue };
  issues.push(issueItem);
  return { issueItem };
};

const updateIssues = (currentIssue, room) => {
  issues = issues.map((issue) => {
    issue.isActive = false;
    return issue.id === currentIssue.id ? { room, ...currentIssue } : issue;
  });
};

const addIssueStat = ({ finalArr, room, statCards }) => {
  const voteNumber = statCards.length;
  issues.forEach((issue) => {
    if (issue.isActive) {
      issue.statistic = Array(...finalArr);
      issue.votes = voteNumber;
    } else {
      issue = issue;
    }
  });
  return issues;
};

const getIssue = (id) => {
  let issue = issues.find((issue) => issue.id === id);
  return issue;
};

const deleteIssue = (id) => {
  const index = issues.findIndex((issue) => issue.id === id);
  if (index !== -1) return issues.splice(index, 1)[0];
};

const getIssues = (room) => issues.filter((issue) => issue.room === room);

module.exports = {
  addIssue,
  getIssue,
  deleteIssue,
  getIssues,
  updateIssues,
  addIssueStat
};
