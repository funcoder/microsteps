Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', function() {
    this.render('Home');
});

Router.route('microsteps', {
    path: '/microsteps/:_id',
    data: function() { return Projects.findOne(this.params._id) }
});