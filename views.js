var GUI = (function(){ //IIFE for all Views

var TaskView = Backbone.View.extend({
	render: function() {
		var title = createElement('h2');
		title.html = this.model.get('title');

		var description = createElement('p');
		description.html = this.model.get('description');

		var creator = createElement('h4');
		creator.html = this.model.get('creator');

		var status = createElement('h6');
		status.html = this.model.get('status');

		var selectStatus = <select><option>Unassigned</option></select><select><option>Assigned</select></option><select><option>In Progress</select></option><select><option>Done</select></options>;
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

		}
		deleteTask: function() {

		}
	}
});

var CreateTaskView = Backbone.View.extend({

});

var UnassignedTasksView = Backbone.View.extend({

});

var UserTasksView = Backbone.View.extend({

});

var UserView = Backbone.View.extend({

});

var LoginView = Backbone.View.extend({

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
