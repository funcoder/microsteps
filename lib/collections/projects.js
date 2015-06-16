Projects = new Mongo.Collection('projects');

Meteor.methods({
    projectInsert: function(projectAttributes) {
        console.log("inserting project");
        
        check(this.userId, String);
        check(projectAttributes, {
            projectName: String
        });

        var user = Meteor.user();
        
        var proj = _.extend(projectAttributes, {
            userId: user._id,
            createdBy: user.username,
            createdOn: new Date()
        });

        var projId = Projects.insert(proj);
        
        return {
            _id: projId
        };
    },
    projectRemove: function(id) {
        check(id, String);
        
        var userId = Meteor.user()._id;
        
        var pr = Projects.findOne({_id : id});
        
        if (pr)
        {
            if (pr.userId == userId)
            {
                // remove all steps
                Microsteps.find({projectId: id}).forEach(function(m) {
                    Microsteps.remove(m._id);
                });
                

                
                Projects.remove(id);
            }
        }
    }
});