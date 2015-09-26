var app = {};

 $(function() { //when DOM is ready...
	app.users = new UserCollection([
		{username:'Person1',
    password: "123"},

		{username:'Person2',
    password: "456"},

		{username:'Person3',
    password: "789"}
	]);

	app.tasks = new TaskCollection([

	]);

	app.gui = new GUI(app.users,
						app.tasks,
						'#app');// selector of main div
})
