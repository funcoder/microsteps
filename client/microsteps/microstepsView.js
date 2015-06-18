Template.microstepsView.onCreated(function() {
    this.subscribe('projectMicrosteps', Router.current().params._id);
});

Template.microstepsView.helpers({
    microsteps: function() {
        return Microsteps.find();
    }
});

Template.microstepsView.events({
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

