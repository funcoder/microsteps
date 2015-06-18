Microsteps = new Mongo.Collection('microsteps');

Meteor.methods({
    addMicrostep: function(attributes) {
        check(this.userId, String);
        
        check(attributes, {
            title: String,
            projectId: String,
            userId: String
        });
        
        var user = Meteor.user();
        
        var ms = _.extend(attributes, {
            userId: user._id,
            createdBy: user.username,
            createdOn: new Date(),
            complete: false
        });
        
        var msId = Microsteps.insert(ms);
        
        console.log("New ID = " + msId);
        
        return {
            _id: msId
        };
    },
    removeMicrostep: function(id) {
        check(id, String);
        console.log("Remove " + id);
        // Check the user owns this rec
        var userId = Meteor.user()._id;
        
        var ms = Microsteps.findOne({_id: id});
        
        if (ms)
        {
            console.log("Microstep found");
            
            if (ms.userId == userId)
            {
                console.log("Removing");
                Microsteps.remove(id);
            }
            else
                console.log("User did not match, expected: " + userId + " but record userId = " + ms.userId);
        }
        else
            console.log("Microstep NOT found");
    },
    holdMicrostep: function(id) {
        Microsteps.update({_id: id}, {$set: {isOnHold: true}});
    },
    removeHoldMicrostep: function(id) {
        Microsteps.update({_id: id}, {$set: {isOnHold: false}});
    }
})