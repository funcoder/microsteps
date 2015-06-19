Template.microstepsView.onCreated(function() {
    this.subscribe('projectMicrosteps', Router.current().params._id);
});

Template.microstepsView.onRendered(function() {
    $('#addMicrostepForm').css('display', 'none');
    $('#hideAddMicrostep').html('Show'); 
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
            else
            {
               $(e.target).find('[name=title]').val(''); 
            }
        });
    },
    'click .remove': function(e) {
        e.preventDefault();
        if (confirm("Delete microstep?"))
        {
            var id = $(e.target).attr("id");
            Meteor.call('removeMicrostep', id, function(error, result) {
                if (error)
                    console.log("Error [removeMicrostep]: " + error);
            });
        }
    },
    'click .makehold': function(e) {
        e.preventDefault();
        
        var id = $(e.target).attr("id");
        Meteor.call('holdMicrostep', id, function(error, result) {
           if (error)
            console.log("Error [holdMicrostep]:" + error);
        });
    },
    'click .releaseHold': function(e) {
        e.preventDefault();
        
        var id = $(e.target).attr("id");
        Meteor.call('removeHoldMicrostep', id, function(error, result) {
            if (error)
                console.log("Error [removeHoldMicrostep]:" + error);
        });
    },
    'click #hideAddMicrostep': function(e) {
        e.preventDefault();

        if ($(e.target).html() == "Hide")
        {
            $('#addMicrostepForm').css('display', 'none');
            $(e.target).html('Show');
        }
        else
        {
            $('#addMicrostepForm').css('display', '');
            $(e.target).html('Hide');
        }
    }
});

