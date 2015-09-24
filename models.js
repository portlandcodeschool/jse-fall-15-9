var UserModel = Backbone.Model.extend({
//[ ]Find tasks associated with user
	//[ ]Export relavent tasks
  	defaults: {
  		username: '',
    	currentUser: false
  	},
    createView: function() {
      var view = new Views.UserView({model: this, model: Tasks});
      view.render();
      $('#app').prepend(view.$el);
    }
});
// Not sure how to incorporate this:
	// var Users = Backbone.Collection.extend({
	// model: User
	// });

var IssueModel = Backbone.Model.extend({
	defaults: {
		title:'',
		description:'',
		creator:'',
		assignee:'',
		status:'unassigned',
	},
	assignTask: function() {

	}
});

var UserCollection = Backbone.Collection.extend({
	model:UserModel
});

var IssueCollection = Backbone.Collection.extend({
	model:IssueModel
});
