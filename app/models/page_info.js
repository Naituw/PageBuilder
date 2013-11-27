var attr = Ember.attr;
var PageInfo = Em.Model.extend({
	background_client: attr('string'),
	desc: attr('string'),
	desc_scheme: attr('string'),
	nick: attr('string'),
	portrait: attr('string'),
	portrait_scheme: attr('string'),

	configurables: function(){
		return PageInfo.CONFIGURABLES;
	}.property('PageInfo.CONFIGURABLES'),
});

PageInfo.reopenClass({
	CONFIGURABLES: [{
		name: '标题',
		path: 'nick',
	}, {
		name: '头像 URL',
		path: 'portrait',
	}, {
		name: '头像跳转 Scheme',
		path: 'portrait_scheme',
	}, {
		name: 'Cover URL',
		path: 'background_client',
	}, {
		name: '简介',
		path: 'desc',
	}, {
		name: '简介跳转 Scheme',
		path: 'desc_scheme',
	}],
});

export default PageInfo;