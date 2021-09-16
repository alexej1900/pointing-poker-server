let issues = [
  {
    room: 10,
    id: '1',
    name: 'issue 12',
    link: ' http://jira.my-company.com/issue-12',
    priority: 'middle',
  },
  {
    room: 10,
    id: '2',
    name: 'issue 13',
    link: ' http://jira.my-company.com/issue-13',
    priority: 'low'
  },
  {
    room: 10,
    id: '3',
    name: 'issue 14',
    link: ' http://jira.my-company.com/issue-14',
    priority: 'height'
  },
];

const addIssue = (currentIssue, room) => {
  const existingIssue = issues.find(issuei => issuei.id === currentIssue.id);

  if (existingIssue) return { error: "Issue has already been taken" };
  if (!currentIssue) return { error: "Issue are required" };
  const issueItem = { room, ...currentIssue };
  issues.push(issueItem);
  return { issueItem };
}

const updateIssues = (currentIssue, room) => {
  issues = issues.map((issue) => {
    return issue.id === currentIssue.id 
      ? { room, ...currentIssue }
      : issue
  })
}

const getIssue = id => {
  let issue = issues.find(issue => issue.id === id)
  return issue;
}

const deleteIssue = (id) => {
  const index = issues.findIndex((issue) => issue.id === id);
  if (index !== -1) return issues.splice(index, 1)[0];
}

const getIssues = (room) => issues.filter(issue => issue.room === room);

module.exports = { addIssue, getIssue, deleteIssue, getIssues, updateIssues };
