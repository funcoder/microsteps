Template.projects.onCreated(function() {
   this.subscribe('myProjects'); 
});

Template.projects.helpers({
    projects: function() {
        
        return Projects.find();
    }
});

Template.projects.events({
    'submit form': function(e)
    {
        e.preventDefault();
        
        var pr = {
            projectName: $(e.target).find('[name=projectName]').val()
        };
        
        Meteor.call('projectInsert', pr, function(error, result) {
            if (error)
                return alert(error)
            else
                $(e.target).find('[name=projectName]').val('').focus(); 
                
        
        })
    },
    'click .removeProject': function(e)
    {
        e.preventDefault();

        var id = $(e.target).attr("id");
        alert(id);
        Meteor.call("projectRemove", id, function(error, result) {
            if (error)
                console.log(error);

        })
    }
})