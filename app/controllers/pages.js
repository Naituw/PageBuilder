import Page from 'appkit/models/page';

var PagesController = Em.ArrayController.extend({
	actions: {
		deletePage: function(page) {
			Em.App.beginLoading();
			page.deleteRecord().then(function(){
				Em.App.endLoading();	
			}, function(){
				Em.App.endLoading();	
			});
			return false;
		},
		createPage: function() {
			Em.App.beginLoading();
			var page = Page.create({
				"pb_create_at": (new Date()).getTime(),
				"pb_shows_info": 1,
				"pb_shows_apps": 1,
				"page_type": "01",
				"show_style": 0,
			});
			var self = this;
			page.save().then(function(){
				self.transitionToRoute('page', page.get('containerid'));
				Em.App.endLoading();
			}, function(){
				Em.App.endLoading();
			});
		},
	},
});

export default PagesController;