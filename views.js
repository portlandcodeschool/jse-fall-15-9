var GUI = (function(){ //IIFE for all Views

var TaskView = Backbone.View.extend({
//[ ] displays a single task
	//[ ] shows its title
	//[ ] shows its description
	//[ ] shows its status
	//[ ] shows its creator 
	//[ ] shows its assignee 
//[ ] each task should include one or more controls (e.g. a select or set buttons) to change its state. Each task view will be associated with exactly one task model, although a model may have more than one view instance. 
	render: function() {
		var title = createElement('h2');
		title.html = this.model.get('title');

		var description = createElement('p');
		description.html = this.model.get('description');

		var status = createElement('h6');
		status.html = this.model.get('status');

		var creator = createElement('h4');
		creator.html = this.model.get('creator');

		var selectStatus = '<select><option>Unassigned</option></select><select><option>Assigned</select></option><select><option>In Progress</select></option><select><option>Done</select></options>';
		for (users in userCollection) { //not exact, needs improvement...how to connect to users
		var option = select.append(createElement('option'));
		option.html = model.get('user');
		}
		this.$el.html(title + description + creator + assigned + status);
		},
	initialize: function () {
		this.model.on("change", this.render, this);
		},
		events: {

		},
		assignTask: function() {

		},
		deleteTask: function() {

		}
	}
});

var CreateTaskView = Backbone.View.extend({
//[x]input field
//[x]create button
//[x]cancel button
//[ ]pushes new tasks to IssueCollection?
    render: function() {
      var header = '<h2>Unassigned Tasks</h2>'
      var title = 'Title: <input type="text" id="title-input">';
      var description = 'Description: <input type="text" id="description-input">';
      var submit = '<button id="add-task">Add Task</button>';
      var cancel = '<button id="cancel">Cancel</button>';
      this.$el.html(header + title + description + submit);
    },
    initialize : function () {
      this.listenTo(this.collection, 'add', this.addTask);
    },
    events : {
      'click #add-task': 'addModel'
      'click #cancel': return
    },
    addModel : function () {
      if ($('#title-input').val() !== '' && $('#description-input').val() !== '') {
        this.collection.add({});
      } else {
        return console.log('Fields cannot be blank');
      }
    },
	addTask : function (newModel) {
	      var taskTitle = $('#title-input').val();
	      var taskDescription = $('#description-input').val();
	      newModel.set('title', taskTitle);
	      newModel.set('description', taskDescription);
	      var view = new TaskView({ model: newModel });
	      view.render();
	      $('#title-input').val('');
	      $('#description-input').val('');
	      this.$el.append(view.$el);
    }
});

var UnassignedTasksView = Backbone.View.extend({
//[ ] includes multiple task views.
	//[ ] one for each task for which the user is either the creator or the assignee
    render: function() {
      var tasks = this.collection.where('status', 'unassigned');
      var views = []
      tasks.each(function(model) {
        views.push(new TaskView({ model: model}));
        this.$el.append(new TaskView({ model: model}));
      });
      this.$el.append(view.$el);
    },
    events : {
      'change #assignee-list': 'assignTask',
      'change #status-list': 'changeStatus',
    },
    assignTask: function() {
      this.model.set('assignee', $('#assignee-list').val());
    },
    changeStatus: function() {
      this.model.set('assignee', $('#status-list').val()));
    }
});

var UserTasksView = Backbone.View.extend({
//[ ]this userview calls usermodel for tasks assigned to user
//[ ]this userview calls usermodel for tasks user assigned 
//[ ]render tasks returned from taskview
    render: function() {
  		var title = '<h2 class="title">' + this.model.get('title') + '</h2>';
  		var description = '<p class="description">' + this.model.get('description') + '</p>';
  		var creator = '<h5 class="creator">' + this.model.get('creator') + '</h5>';
  		var assignee = '<h5 class="assignee">' + this.model.get('assignee') + '</h5>';
  		var status = '<h5 class="status">' + this.model.get('status') + '</h5>';
  		this.$el.html(title + description);
  	},
    initialize: function () {
      this.model.on('change', this.render, this);
    }
});

var UserView = Backbone.View.extend({
//[ ] Unassigned task view for claiming or creating new tasks 
//[ ] User task view for tracking the status of all tasks associated with user
//[ ] Logout button that replaces the userview with the login view
    render: function() {
      var username = '<h2>' + this.model.get('username') + '</h2>';
      var logout = '<button id="logout">Logout</button>';
      this.$el.html(username + logout);
    },
    initialize: function() {
      this.model.on('change', this.render, this);
    },
    events: {
      'click #logout': 'logout'
    },
    logout: function() {
      this.model.set('currentUser', false);
      this.remove();
      $('#app').hide();
      $('#login').show(); 
    }

});

var LoginView = Backbone.View.extend({
//[ ] This is the initial view shown when launching the app (i.e. opening the html file in a browser). It should let the user either log in by choosing from a list of known user names, or create a new user name. Feel free to add some form of user authentication later, but keep things simple for now.
});


// generic ctor to represent interface:
function GUI(users,tasks,el) {
	// users is collection of User models
	// tasks is collection of Task models
	// el is selector for where GUI connects in DOM

	//...
}

return GUI;
}())
