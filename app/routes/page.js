import Page from 'appkit/models/page';

var PageRoute = Ember.Route.extend({
	model: function(params) {
		return Page.fetch(params.page_id);
	}, 
	renderTemplate: function(){
		this.render();
		this.render('page-nav', {
			outlet: 'nav',
			into: 'application'
		});
	},
	actions: {
		willTransition: function(transition) {
			var controller = this.controllerFor('page');
			var model = controller.get('model');
			if (model.get('isDirty')) 
			{
				if (!window.confirm('确定要离开吗？未保存的改动将会丢失！')) {
					transition.abort();
				}
				else {
					Em.run.later(this, function(){
						window.location.reload();
					}, 100);
					//controller.revertModel();
					return true;
				}
			} else {
				return true;
			}
		},
	},
});

export default PageRoute;