var attr = Ember.attr;
var CardGroupItem = Em.Model.extend({
	title_sub: attr('string'),
	pic: attr('string'),
	icon: attr('string'),
	scheme: attr('string'),

	configurables: function(){
		return CardGroupItem.CONFIGURABLES;
	}.property('CardGroupItem.CONFIGURABLES'),
	removeable: function(){
		return true;
	}.property().volatile(),
});

CardGroupItem.reopenClass({
	CONFIGURABLES: [{
		name: '标题',
		path: 'title_sub',
	}, {
		name: '图片URL',
		path: 'pic',
	}, {
		name: '跳转URL',
		path: 'scheme',
	},],
});

export default CardGroupItem;