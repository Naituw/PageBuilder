var attr = Ember.attr;

var PageApp = Ember.Model.extend({
	title: attr('string'),
	scheme: attr('string'),
	count: attr('number'),

	configurables: function(){
		return PageApp.CONFIGURABLES;
	}.property('PageApp.CONFIGURABLES'),
	removeable: function(){
		return true;
	}.property().volatile(),
});

PageApp.reopenClass({
	CONFIGURABLES: [{
		name: '标题',
		path: 'title',
	}, {
		name: '跳转Scheme',
		path: 'scheme',
	}, {
		name: '计数',
		path: 'count',
	}],
});

export default PageApp;