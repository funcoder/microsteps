Notes = new Mongo.Collection('notes');

Meteor.methods({
    addNote: function(noteAttributes) {
        check(noteAttributes, {
            title: String,
            description: String,
            projectId: String,
            userId: String
        });
        
        var user = Meteor.user();
        
        var note = _.extend(noteAttributes, {
            userId: user._id,
            createBy: user.username,
            createdOn: new Date()
        });
        
        var noteId = Notes.insert(note);
        
        return {
            _id : noteId
        };
    },
    removeNote: function(id) {
        check(id, String);
        console.log("Remove " + id);
        // Check the user owns this rec
        var userId = Meteor.user()._id;
        
        var ms = Notes.findOne({_id: id});
        
        if (ms)
        {

            if (ms.userId == userId)
            {
                Notes.remove(id);
            }
        }
    },
    updateNote: function(note) {
        check(note, {
            _id: String,
            title: String,
            description: String,
            userId: String
        });
        
        var userId = Meteor.user()._id;
        
        var result = Notes.update({_id: note._id}, {$set: { title: note.title, description: note.description}});
    }
    
});