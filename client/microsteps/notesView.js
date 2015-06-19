Template.notesView.onCreated(function() {
    this.subscribe('projectNotes', Router.current().params._id);
});

Template.notesView.helpers({
    notes: function() {
        return Notes.find();
    }
});

Template.notesView.events({
    'submit form': function(e) {
        e.preventDefault();
        var ms = {
            projectId: Router.current().params._id,
            title: $(e.target).find('[name=title]').val(),
            description: $(e.target).find('[name=description]').val(),
            userId: Meteor.userId()
        };
        
        Meteor.call('addNote', ms, function(error, result) {
            if (error)
            {
                console.log("Error [addNote]: " + error);
            }
            else {
                $(e.target).find('[name=title').val('');
                $(e.target).find('[name=description]').val('');
            }
        });
    },
    'click .remove': function(e) {
        e.preventDefault();

        if(confirm('Delete note?'))
        {
            var id = $(e.target).attr("id");
            Meteor.call('removeNote', id, function(error, result) {
                if (error)
                    console.log("Error [removeNote]: " + error);
            });
        }
    },
    'click .view': function(e) {
        e.preventDefault();
        var id = $(e.target).attr("id");
        var note = Notes.findOne({_id: id});
        console.log("ID: " + id +  ", Note: " + note.title);
        
        Modal.show("viewNote", {note: note});
    },
    'click #hideAddNotes': function(e) {
        e.preventDefault();

        if ($(e.target).html() == "Hide")
        {
            $('#addNoteForm').css('display', 'none');
            $(e.target).html('Show');
        }
        else
        {
            $('#addNoteForm').css('display', '');
            $(e.target).html('Hide');
        }
    }    
});
