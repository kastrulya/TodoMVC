var app = app || {};

app.TodoView = Backbone.View.extend({
	tagName: 'li',
	template: _.template($('#item-template').html()),
	initialize: function(){
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(this.model, 'change', this.render);
	},
	events: {
		'click .destroy' : 'clear',
		'click .toggle' : 'toggleCompleted',
		'dblclick label' : 'changeTitle',
		'keypress .editing': 'saveOnEnter',
		'blur .editing': 'saveChanges'
	},
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		this.$el.toggleClass('completed', this.model.get('completed')); 
		this.$title = this.$('label');
		this.$editing = this.$('.editing');
		return this;
	},
	clear: function(){
		this.model.destroy();
	},
	toggleCompleted: function(){
		this.model.toggle();
	},
	changeTitle: function(){
		this.$title.hide();
		var prevTitle = this.$('label').html();
		var editField = $('<input/>');
		editField.addClass('editing');
		editField.attr('placeholder', prevTitle);
		this.$editing = editField;
		this.$('.view').append(editField);
		this.$editing.focus();
	},
	saveChanges: function(){
		if (this.$editing.val().trim())
				this.model.save('title', this.$editing.val().trim());
			this.$title.show();
			this.$editing.remove();
	},
	saveOnEnter: function(event){
		if (event.which == KEY_ENTER) {
			saveChanges();
		}
	}
});