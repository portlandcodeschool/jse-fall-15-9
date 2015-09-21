var UserModel = Backbone.Model.extend({
	defaults: {
		username:''
	}
	//find tasks for user
	//export relavent tasks
});

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
