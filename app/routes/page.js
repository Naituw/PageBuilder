import Page from 'appkit/models/page';

var PageRoute = Ember.Route.extend({
	model: function(params) {
		return Page.find(params.page_id);
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
			var model = this.controllerFor('page').get('model');
			if (model.get('isDirty')) 
			{
				if (!window.confirm('确定要离开吗？未保存的改动将会丢失！')) {
					transition.abort();
				}
				else {
					model.get('cards').clear(); // 旧数据有一个backingStore，会从中恢复
					model.revert();
					return true;
				}
			} else {
				return true;
			}
		},
	},
});

export default PageRoute;