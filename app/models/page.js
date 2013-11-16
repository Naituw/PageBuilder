import PBModel from 'appkit/models/model';

var attr = Ember.attr;
var Page = PBModel.extend({
	title_top: attr('string'),
	show_style: attr('number'),
	cards: Ember.hasMany('card'),
});

var PageConfigurable = [{
	name: '标题',
	path: 'title_top',
	viewType: 'text-field',
}, {
	name: '显示模式',
	path: 'show_style',
	viewType: 'select',
	options: ['气泡', '通栏'],
}];

Page.adapter = Ember.FixtureAdapter.create();

Page.FIXTURES = [{
	'id': 1000,
	'title_top': '理想国际大厦',
	'show_style': 0,
	'cards': [],
	'configurable': PageConfigurable,
}, {
	'id': 1001,
	'title_top': '朔黄铁路大厦',
	'show_style': 0,
	'cards': [],
	'configurable': PageConfigurable,
}];

export default Page;
