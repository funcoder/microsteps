Template.microsteps.onCreated(function() {
    this.subscribe('projectDetails', Router.current().params._id); 
    this.subscribe('projectMicrosteps', Router.current().params._id);
});

Template.microsteps.helpers({
    project: function() {
        return Projects.findOne().projectName;
    },
    microsteps: function() {
        return Microsteps.find();
    }
});

Template.microsteps.events({
    'submit form': function(e) {
        e.preventDefault();
        var ms = {
            projectId: Router.current().params._id,
            title: $(e.target).find('[name=title]').val(),
            userId: Meteor.userId()
        };
        
        Meteor.call('addMicrostep', ms, function(error, result) {
            if (error)
            {
                console.log("Error [addMicrostep]: " + error);
            }
        });
    },
    'click .remove': function(e) {
        e.preventDefault();
        var id = $(e.target).attr("id");
        Meteor.call('removeMicrostep', id, function(error, result) {
            if (error)
                console.log("Error [removeMicrostep]: " + error);
        });
    }
});

