Meteor.publish('myProjects', function() {
   return Projects.find({userId: this.userId});
});

Meteor.publish('projectDetails', function(id) {
    return Projects.find({_id: id});
});

Meteor.publish('projectMicrosteps', function(id) {
    return Microsteps.find({projectId: id});
});