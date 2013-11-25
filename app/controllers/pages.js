import Page from 'appkit/models/page';

var PagesController = Em.ArrayController.extend({
	actions: {
		deletePage: function(page) {
			page.deleteRecord();
			return false;
		},
	},
});

export default PagesController;