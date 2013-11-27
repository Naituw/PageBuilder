var PageAppView = Em.View.extend({
	app: null,
	classNameBindings: [':page-app', 'singleLineMode:single-line', 'appSelected:selected'],
	templateName: 'page_app',

	singleLineMode: function(){
		if (this.get('app.title.length') && this.get('count')) return false;
		return true;
	}.property('app.title', 'count'),

	appSelected: function(){
		if (!this.get('app')) return false;
		return this.get('app') === this.get('controller.selectedItem');
	}.property('app', 'controller.selectedItem'),

	click: function(){
		this.set('controller.selectedItem', this.get('app'));
		return false;
	},

	count: function(){
		var c = window.parseInt(this.get('app.count'));
		if (window.isNaN(c)) return 0;
		if (c <= 99999) {
			return c;
		}
		else if (c <= 9999 * 10000) {
			return (parseInt(c / 10000, 10) + '万');
		}
		else return '9999万';
	}.property('app.count'),
});

export default PageAppView;