
if (this.userId) {
  var projects = Projects.find({userId: this.userId, projectName: 'Inbox'});

  if (!projects) {
    // Add the default Inbox
    var pr = {
      projectName: 'Inbox',
      userId: this.userId
    }

    Projects.insert(pr);
  }
}
