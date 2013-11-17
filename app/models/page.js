import PBModel from 'appkit/models/model';

var attr = Ember.attr;
var Page = PBModel.extend({
	containerid: attr('string'),
	title_top: attr('string'),
	show_style: attr('number'),
	page_type: attr('string'),
	shared_text: attr('string'),
	shared_text_qrcode: attr('string'),
	cards: Ember.hasMany('card'),

	configurables: function(){
		return Page.CONFIGURABLES;
	}.property('Page.CONFIGURABLES'),
});

Page.reopenClass({
	CONFIGURABLES: [{
		name: '标题',
		path: 'title_top',
		viewType: 'text-field',
	}, {
		name: '显示模式',
		path: 'show_style',
		viewType: 'select',
		options: [{
			title:'通栏（默认）',
			value:0,
		}, {
			title:'气泡',
			value:1,
		}],
	}, {
		name: 'Page类型',
		path: 'page_type',
		viewType: 'select',
		options: [
			{title: '位置',value: '01'},
			{title: '书籍',value: '02'},
			{title: '应用',value: '04'},
			{title: '用户主页',value: '05'},
			{title: '游戏',value: '07'},
			{title: '话题',value: '08'},
			{title: '广播',value: '11'},
			{title: '电视',value: '13'},
			{title: '音乐',value: '15'},
			{title: '汽车',value: '17'},
			{title: '手机',value: '18'},
			{title: '电影',value: '20'},
		],
	}, {
		name: '分享默认文案',
		path: 'shared_text',
		viewType: 'text-view',
	}, {
		name: '分享二维码默认文案',
		path: 'shared_text_qrcode',
		viewType: 'text-view',
	}],
});

Page.adapter = Ember.FixtureAdapter.create();
Page.primaryKey = 'containerid';

Page.FIXTURES = [{
	'containerid': 1000,
	'title_top': '理想国际大厦',
	'show_style': 0,
	'cards': [],
}, {
	'containerid': 1001,
	'title_top': '朔黄铁路大厦',
	'show_style': 0,
	'cards': [],
}];

export default Page;
