Template.microsteps.onCreated(function() {
    this.subscribe('projectDetails', Router.current().params._id); 
});

Template.microsteps.helpers({
    project: function() {
        return Projects.findOne().projectName;
    }
});