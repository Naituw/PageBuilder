import PBModel from 'appkit/models/model';
import CardGroupItem from 'appkit/models/card_group_item';

var attr = Ember.attr;

var Card = PBModel.extend({
	itemid: attr('string'),
	title: attr('string'),
	card_type: attr('number'),
	card_type_name: attr('string'),
	scheme: attr('string'),
	openurl: attr('string'),
	is_asyn: attr('number'),
	display_arrow: attr('number'),
	group: Ember.hasMany(CardGroupItem, {'key': 'group', 'embedded':true}),

	pb_model: false,

	toJSON: function(){
		var json = this._super();
		var keys = this.get('jsonKeys');
		if (keys) {
			for (var i = 0; i < keys.length; i++) {
				var k = keys[i];
				json[k] = this.get(k);
			}
		}
		delete json.pb_model;
		return json;
	},
	load: function(id, hash) {
		this._super(id, hash);
		this.updateJSONKeys();
	},
	updateJSONKeys: function(){
		var data = this.get('_data');
		var keys = [];

		for (var k in data) {
			if (k === 'group') continue;

			this.set(k, data[k]);
			keys.push(k);
		}

		this.set('jsonKeys', keys);
	},

	configurables: function(){
		var types = Card.TYPES;
		if (!types) return [];

		var cardType = this.get('card_type');
		var key = null;

		var configs = [];
		configs.pushObjects(Card.CONFIGURABLES);

		for(var prop in types) {
			if(types.hasOwnProperty(prop)) {
				if(types[prop] === cardType) {
					key = prop;
					break;
				}
			}
		}

		if (key) {
			var subConfigs = Card.SUB_CONFIGURABLES[key];

			if (subConfigs && subConfigs.length) {
				configs.pushObjects(subConfigs);
			}
		}

		return configs;
	}.property('Card.CONFIGURABLES', 'Card.SUB_CONFIGURABLES', 'card_type'),
	removeable: function(){
		return true;
	}.property().volatile(),

	desc_align_style: function(){
		var a = this.get('desc_align');
		if (!a) return '';
		if (a === 'middle') return 'text-align:center;';
		if (a === 'right') return 'text-align:right;';
	}.property('desc_align'),
	show_type_color_style: function(){
		var t = parseInt(this.get('show_type'), 10);
		var c = null;
		var tc = '#FFF';
		switch(t) {
			case 0: c = '#F8F7F7'; tc = '#555'; break;
			case 1: c = '#0B6FDE'; break;
			case 2: c = '#2BB500'; break;
			case 3: c = '#DB3325'; break;
			case 4: c = '#F1F1F1'; tc = '#666'; break;
		}
		return 'background-color:' + c + ';color:' + tc + ';';
	}.property('show_type'),
});

Card.reopenClass({
	createWithMeta: function(hash){
		var card = this.create();
		card.load(hash.itemid, hash);
		return card;
	},
	TYPES: {
		BasicInfo: 1,
		AppsList: 2,
		PhotosList: 3,
		SingleText: 4,
		Input: 5,
		Button: 6,
		MultiLineText: 7,
		ImageText: 8,
		Status: 9,
		User: 10,
		Multi: 11,
		Webview: 13,
		Information: 14,

		PhotoText: 15,
		DoubleButton: 16,
		DoubleTextLink: 17,
		GridButton: 19,

		DoubleRealButton: 20,
		MultiUser: 21,

		SquarePhoto: 22,
		BriefAppsList: 23,
		MultiUserSeven: 24,
		ImageWithDoubleFieldDoubleLines: 25,
		ImageWithDoubleFieldTripleLines: 26,
		LargePhotoText: 27,
		AvatarWithDoubleFieldTripleLines: 28,
		SingleLargePhoto: 29,
		AvatarWithDoubleFieldDoubleLines: 30,
		SearchCard: 31,
		SingleTextWithRightText: 32,
		GridLargeButton: 35,
	}
});

Card.reopen({
	pb_type_name: function(){
		var t = Card.TYPES;
		switch(this.get('card_type')) {
			case t.ImageWithDoubleFieldDoubleLines: return '图片两字段两行Card';
			case t.ImageWithDoubleFieldTripleLines: return '图片两字段三行Card';
			case t.SingleLargePhoto: return '单张大图Card';
			case t.SingleText: return '单行文字按钮';
			case t.MultiLineText: return '四行以内纯文本Card';
			case t.Button: return '普通按钮';
			case t.SearchCard: return '搜索框';
			case t.GridButton: return '四列式按钮';
			default: return 'Card';
		}
	}.property('card_type'),
});

Card.adapter = Ember.FixtureAdapter.create();
Card.primaryKey = 'itemid';

Card.FIXTURES = [{
	'itemid': Card.TYPES.ImageWithDoubleFieldDoubleLines,
	'card_type': Card.TYPES.ImageWithDoubleFieldDoubleLines,
	'scheme': 'sinaweibo://cardlist?containerid=101403026',
	'pb_model': true,

	'title_sub': '流行与古典的碰撞',
	'desc': '邀你聆听王力宏李云迪经典作品',
	'pic': 'http://weiyinyue.music.sina.com.cn/operation/focusphoto/e238e81a18469bc5131588f6782a3cf9.jpg'
}, {
	'itemid': Card.TYPES.ImageWithDoubleFieldTripleLines,
	'card_type': Card.TYPES.ImageWithDoubleFieldTripleLines,
	'scheme': 'sinaweibo://pageinfo?containerid=10012099788',
	'pb_model': true,

	'title_sub': '演员:乔治·克鲁尼 / 桑德拉·布洛克 / 艾德·哈里斯 / 奥托·伊格内修森 / 保罗·夏尔马 / 艾米·沃伦 / 巴舍尔·萨维奇',
	'desc': '地心引力',
	'pic': 'http://mu1.sinaimg.cn/square.180/weiyinyue.music.sina.com.cn/movie_poster/99788.jpg',
}, {
	'itemid': Card.TYPES.SingleText,
	'card_type': Card.TYPES.SingleText,
	'scheme': 'http://weibo.com',
	'pb_model': true,

	'desc': '标题标题标题',
	'desc_extr': '(1000)',
	'pic': 'http://tp4.sinaimg.cn/1781387491/180/5661992330/0',
	'desc_align': 'left',
}, {
	'itemid': Card.TYPES.SingleLargePhoto,
	'card_type': Card.TYPES.SingleLargePhoto,
	'scheme': 'sinaweibo://detail?mblogid=Ak3ZRCT0u',
	'pb_model': true,

	'pic': 'http://image2.sina.com.cn/music/web/ting2013/page/movie/kongzhi_gift.jpg',
	'title_sub': '标题标题标题',
}, {
	'itemid': Card.TYPES.MultiLineText,
	'card_type': Card.TYPES.MultiLineText,
	'pb_model': true,

	'desc': '科比·布莱恩特（1978年8月23日－），美国职业篮球运动员，自1996年起效力于NBA洛杉矶湖人队，司职得分后卫。科比·布莱恩特是前NBA篮球运动员乔·布莱恩特的儿子。科比是NBA最好的得分手之一，突破、投篮、罚球、三分球他都驾轻就熟，几乎没有进攻盲区，单场比赛81分的个人纪录就有力的证明了这一点。',
	'source': '来源: XXXX',
}, {
	'itemid': Card.TYPES.Button,
	'card_type': Card.TYPES.Button,
	'scheme': 'http://weibo.com',
	'pb_model': true,

	'desc': '我来做任务',
	'show_type': 2,
}, {
	'itemid': Card.TYPES.SearchCard,
	'card_type': Card.TYPES.SearchCard,
	'scheme': 'sinaweibo://searchall?type=book',
	'pb_model': true,

	'desc': '搜图书',
}, {
	'itemid': Card.TYPES.GridButton,
	'card_type': Card.TYPES.GridButton,
	'pb_model': true,

	'col': 4,
	'group': [{
		title_sub: '读书',
		pic: 'http://u1.sinaimg.cn/upload/2013/10/24/42982.png',
		scheme: 'sinaweibo://cardlist?containerid=1015031&cache_need=1',
	}, {
		title_sub: '美食',
		pic: 'http://u1.sinaimg.cn/upload/2013/10/24/42987.png',
		scheme: 'sinaweibo://cardlist?containerid=101303&needlocation=1&cache_need=1',
	}, {
		title_sub: '旅游',
		pic: 'http://u1.sinaimg.cn/upload/2013/10/24/42985.png',
		scheme: 'sinaweibo://cardlist?containerid=101203&cache_need=1&needlocation=1',
	}, {
		title_sub: '神最右',
		pic: "http://u1.sinaimg.cn/upload/2013/10/24/42989.png",
		scheme: "sinaweibo://cardlist?containerid=102903_-_PUB_RIGHT&cache_need=1&title=%e7%a5%9e%e6%9c%80%e5%8f%b3",
	}],
}];

Em.Card = Card;

export default Card;