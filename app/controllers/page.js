var PageController = Em.ObjectController.extend({
	selectedItem: null,
	pageSelected: function(){
		return this.get('model') === this.get('selectedItem');
	}.property('model','selectedItem'),
	actions: {
		selectPage: function(){
			this.set('selectedItem', this.get('model'));
		},
	},
});

export default PageController;