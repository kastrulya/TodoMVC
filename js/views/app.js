var app = app || {};

app.AppTodo = Backbone.View.extend({
	el: '#todoapp',
	initialize: function(){
		this.$input = this.$('#new-todo')
		this.listenTo(app.Todos, 'add', this.addOne);
		app.Todos.fetch();
	},
	events: {
		'keypress #new-todo': 'createOnEnter',
	},
	createOnEnter: function(event){
		var title = this.$input.val().trim();
		if (event.which != KEY_ENTER || !title) {
			return;
		}
		var newModel = {'title': title, 'completed': false};
		app.Todos.create(newModel);
		this.$input.val('');
	},
	addOne: function(todo){
		var todoView = new app.TodoView({model:todo});
		this.$('#todo-list').append(todoView.render().el);
	}
});