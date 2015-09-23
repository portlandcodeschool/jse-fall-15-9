GUI = (function(){ //IIFE for all Views

var TaskView = Backbone.View.extend({
	render: function () {

		//console.log(this.collection);
		  // var taskTitle = this.model.get("title");
		  // var taskDescription = this.model.get("description");
		  // var taskCreator = this.model.get("creator");
		  // var taskAssignee = this.model.get("assignee");
		  // var taskStatus = this.model.get("status");
		  // this.$el.html("Task Title" + "<br><div>" + taskTitle + "</div>" +
		  // 							"Description" + "<br><div>" + taskDescription + "</div>" +
		  // 							"Creator" + "<br><div>" + taskCreator + "</div>" +
		  // 							"Assignee" + "<br><div>" + taskAssignee + "</div>" +
		  // 							"Status" + "<br><div>" + taskStatus + "</div>");
	},
	initialize: function () {   //must be called initialize!
			this.model.on("change", this.render, this);
			// last argument 'this' ensures that render's
			// 'this' means the view, not the model
	},
 	events: {
 			"click #clearBtn" : "clear"
 	},
 	clear: function () {
 			this.model.replace("");
 	}
 });
var CreateTaskView = Backbone.View.extend({
	render: function () {
		//put the default attribute values in variables.  They will show in the text input fields when loaded.
		 var taskTitle = this.model.get("title");
		 var taskDescription = this.model.get("description");
		 var taskCreator = this.model.get("creator");
		 var taskAssignee = this.model.get("assignee");
		 var taskStatus = this.model.get("status");
		 //create our Save button
		 var saveBtn = '<button id = "saveBtn"> Save Task </button>';
		 //make text input fields which show default attributes upon load
		 var titleInput = '<input id= "title" type="text" value="' + taskTitle + '" />';
		 var descrInput = '<input id= "description" type="text" value="' + taskDescription + '" />';
		 var creatorInput = '<input id = "creator" type="text" value="' + taskCreator + '" />';
		 var assigneeInput = '<input id = "assignee" type="text" value="' + taskAssignee + '" />';
		 var statusInput = '<input id = "status" type="text" value="' + taskStatus + '" />';
		 //append text input titles, text input fields, and save button into a div into task-list
		 this.$el.append("Task Title" + "<br><div>" + titleInput + "</div>" +
		 							"Description" + "<br><div>" + descrInput + "</div>" +
		 							"Creator" + "<br><div>" + creatorInput + "</div>" +
		 							"Assignee" + "<br><div>" + assigneeInput + "</div>" +
		 							"Status" + "<br><div>" + statusInput + "</div>" +
									"<br><div>" + saveBtn + "</div>");
	},
	initialize: function () {
			this.model.on("change", this.render, this);
			this.listenTo(this.collection, 'add', this.render);
	},
	events: {
		//when click Save button, run save function.
			"click #saveBtn" : "save"
	},
	//This function should find the input in the text inputs (see comment in function for example) and then set the model's attributes to the inputted values.
	//Then we should like create a new TaskView that just shows our task...no input fields.
	 save: function() {
	 	 //var titleStr = this.$el.find("#title").val();
		 //var
  //the comments below this comment in this function are just gobbledey goop
	// 	var view = new TaskView({model: mod});
	// 	//console.log(view);
	// 	//view.render();
	// 	//this.$("#task-list").replaceWith(view.$el);
	//
},

});

var UnassignedTasksView = Backbone.View.extend({
	//render function runs immediately which is just putting the 'Create New Task' button in a div called 'task-list' inside the app div
	render: function() {
		var btn = '<button id="newTaskBtn">Create New Task</button>';
		var div = '<div id="task-list"></div>';
		this.$el.html(div + btn);
	},
  //this listens for a collection to be added (which happens when addModel is called by clicking the 'Create New Task' button) and then calls addView
	initialize : function () {
    this.listenTo(this.collection, 'add', this.addView);
  },

  events : {
		//when the "Create New Task" button is clicked, the addModel function is called
    "click #newTaskBtn" : "addModel"
  },
	//addModel adds a collection which adds a model (with default attributes)
  addModel : function () {
    this.collection.add({});
    // collection adds a model, fires add event, then listener calls this.addView(model)
  },
	//creates a new CreateTaskView with the model that is created from addModel and renders CreateTaskView's render function
  addView : function (newModel) {
    var view = new CreateTaskView({model : newModel});
    view.render();
		//appends CreateTaskView stuff to task-list div
    this.$("#task-list").append(view.$el);
  },
});

var UserTasksView = Backbone.View.extend({
	render: function() {
		this.$el.html("<p>Tasks for user " + this.model.get("username") +
		":</p>");
		//Get all the tasks associated with a user
		var userCreatedTasks = this.collection.where({creator: this.model.get("username")});
		var userAssignedTasks = this.collection.where({assignee: this.model.get("username")});
		//And append them (currently appends [Object object] -- FIX THIS)

		//userCreatedTasks.plucl(attribute); collection.pluck()
		this.$el.append("<p>"+userCreatedTasks+"</p>"+"<p>"+
		 userAssignedTasks+"</p>");
		console.log(userCreatedTasks, userAssignedTasks);

		//NEED TO LISTEN FOR ADDS, TO UPDATE IN REAL TIME!!
	},
	initialize: function() {
		this.listenTo(this.collection, "add", )
	}
});

var UserView = Backbone.View.extend({
	render: function() {
		this.$el.html("<p>Welcome, "+this.model.get('username')+"</p>"+
		"<button id='logOut'>Log Out</button>");
	},
	events: {
		"click #logOut": "logOut"
	},
	logOut: function() {
		this.model = undefined;
		this.$el.html('');
		loginView = new LoginView({collection: app.users});
		loginView.render();
		$("#login").append(loginView.$el);
	}

});

var LoginView = Backbone.View.extend({
	render: function() {
		var loginBtn = "<button id='loginBtn'>Log In</button>";
		this.$el.html("<h2>Log In</h2>" + "<input id='userInput'>Username</input>" +
		"<input id='passInput'>Password</input>" + loginBtn);
	},
	events: {
		"click #loginBtn": "authenticate"
	},
	initialize: function() {
		this.$el.on("")
	},
	authenticate: function() {
		var userInput = $("#userInput").val(); //Grab the user input
		var passInput = $("#passInput").val();

		//Check to see if there's a user with given username
		//If not, tell us. If so, see if the passwords match
		//Then load a UserView!
		if(!this.collection.findWhere({username: userInput})) {
			this.$el.html("<p class='hideSoon'>Username " + userInput +
			//In the future I want to hide these 'hidesoon's after a while
			" does not match any registered users.</p>");
		} else {
			var user = this.collection.findWhere({username: userInput});
		}
		if (user.get("password") === passInput) {
			this.grantAccess(user);		//This will load the UserView.
		} else this.$el.html("<p class='hideSoon'>Incorrect password.</p>");
	},
	clear: function() {
		this.$el.html('');
	},
	grantAccess : function(user) {
		//Create a new UserView and UserTasksView to replace the LoginView
		var userView = new UserView({model: user});
		this.clear();
		userView.render();
		$("#app").append(userView.$el);

		var userTasksView = new UserTasksView({model: user, collection: app.tasks});
		userTasksView.render();
		$("#app").append(userTasksView.$el);
	}
});

// generic ctor to represent interface:
function GUI(users, tasks, el) {
	// users is collection of User models
	this.users = users;
	// tasks is collection of Task models
	this.tasks = tasks;
	// el is selector for where GUI connects in DOM
	this.el = el;

//Start the user on the LoginView. Authenticate their info, then
//send them on to the
loginView = new LoginView({collection: app.users});
loginView.render();
$("#login").append(loginView.$el);


	//this starts process - creates UnassignedTasksView with a TaskCollection (which has TaskModel in it)
	unassignedTasksView = new UnassignedTasksView({collection: this.tasks});
	//immediately runs the render function in UnassignedTasksView (which just shows the 'Create New Task' button)
	unassignedTasksView.render();
	//appends render stuff into our app div
	$(el).append(unassignedTasksView.$el);
}
return GUI;

})();
