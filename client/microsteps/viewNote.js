Template.viewNote.events({
    'submit form': function(e) {
        e.preventDefault();
        
        var id = $(e.target).find('[name=noteid]').val();
        var title = $(e.target).find('[name=title]').val();
        var desc = $(e.target).find('[name=description]').val();
        
        var note = {
            _id: id,
            title: title,
            description: desc,
            userId: Meteor.userId()
        };
        
        Meteor.call('updateNote', note, function(error, result) {
            if (error)
            {
                console.log("Error [updateNote]: " + error);
            }
        });
        
        
    }
})