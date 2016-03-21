var app = app || {};

app.TodoList = Backbone.Collection.extend({
	model: app.Todo,
	localStorage: new Backbone.LocalStorage("todo-storage")
});

app.Todos = new app.TodoList();