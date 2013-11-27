import PBModel from 'appkit/models/model';
import Card from 'appkit/models/card';
import PageInfo from 'appkit/models/page_info';
import PageApp from 'appkit/models/page_app';

var attr = Ember.attr;
var Page = PBModel.extend({
	containerid: attr('string'),
	title_top: attr('string'),
	show_style: attr('number'),
	page_type: attr('string'),
	shared_text: attr('string'),
	shared_text_qrcode: attr('string'),
	cards: Ember.hasMany(Card, {'key': 'cards', 'embedded':true}),
	pageInfo: Ember.belongsTo(PageInfo, {'key': 'pageInfo', 'embedded':true}),
	pb_page_apps: Ember.hasMany(PageApp, {'key': 'pb_page_apps', 'embedded':true}),

	pb_create_at: attr('number'), // milliseconds since 1900
	pb_shows_info: attr('number'), // 0 or 1
	pb_shows_apps: attr('number'), // 0 or 1

	displayTitle: function(){
		return this.get('pageInfo.nick.length') ? this.get('pageInfo.nick') : this.get('title_top');
	}.property('pageInfo.nick', 'title_top'),

	infoVisibleChange: function(){
		if (this.get('pb_shows_info')) this.set('show_style', 1);
	}.observes('pb_shows_info'),

	toJSON: function(){
		var json = this._super();
		var page = json[Page.rootKey];
		if (!page.pageInfo) {
			page.pageInfo = {};
		}
		var keys = ['containerid', 'page_type', 'page_title', 'shared_text', 'shared_text_qrcode', 'title_top'];
		for (var i = keys.length - 1; i >= 0; i--) {
			var key = keys[i];
			page.pageInfo[key] = this.get(key);
		}

		page.cardlistInfo = page.pageInfo;

		if (!this.get('pb_shows_apps')) {
			delete page.pb_page_apps;
		} else if (!page.pb_page_apps) {
			json.pb_page_apps = [];
		}
		return json;
	},

	configurables: function(){
		return Page.CONFIGURABLES;
	}.property('Page.CONFIGURABLES'),
});

Page.reopenClass({
	CONFIGURABLES: [{
		name: '顶导标题',
		path: 'title_top',
		viewType: 'text-field',
	}, {
		name: '显示模式',
		path: 'show_style',
		viewType: 'select',
		options: [{
			title:'通栏',
			value:0,
		}, {
			title:'气泡',
			value:1,
		}],
		disable: {
			path: 'pb_shows_info',
			value: 1,
		},
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
		name: '包含基本信息视图',
		path: 'pb_shows_info',
		viewType: 'checkbox',
	}, {
		name: '包含横排链接列表视图',
		path: 'pb_shows_apps',
		viewType: 'checkbox',
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

Page.primaryKey = 'containerid';

Page.adapter = Ember.RESTAdapter.create();
Page.url = 'http://pagebuilder.sinaapp.com/pages';
Page.collectionKey = 'pages';
Page.rootKey = 'page';

/*
Page.adapter = Ember.FixtureAdapter.create();
Page.FIXTURES = [{
	'containerid': 1000,
	'title_top': '位置',
	'show_style': 0,
	'page_type': '02',
	'cards': [],
	'pb_create_at': 1381191330153,
	'pb_shows_info': 1,
	'pb_shows_apps': 1,

	'pb_page_apps': [{
		'title': '微博',
		'count': 4039,
		'scheme': 'http://weibo.com',
	}],

	'pageInfo': {
		'nick': '理想国际大厦',
		'portrait': 'http://u1.sinaimg.cn/upload/2013/07/03/33338.png',
		'desc': '北京市海淀区，北四环西路58号',
	},
}, {
	'containerid': 1001,
	'title_top': '朔黄铁路大厦',
	'show_style': 0,
	'cards': [],
	'pb_create_at': 1385111330153,
}, {
	'containerid': 1002,
	'title_top': '泰鹏大厦',
	'show_style': 1,
	'cards': [],
	'pb_create_at': 1385191330153,
}];
*/

export default Page;
