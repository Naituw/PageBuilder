import PBModel from 'appkit/models/model';

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
		var data = this.get('_data');
		this.setProperties(data);

		var keys = [];
		for(var k in data) keys.push(k);		
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
});

Card.reopenClass({
	createWithMeta: function(hash){
		var card = this.create(hash);
		var keys = [];
		for(var k in hash) keys.push(k);		
		card.set('jsonKeys', keys);
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
			default: return 'Card';
		}
	}.property('card_type'),
});

Card.adapter = Ember.FixtureAdapter.create();
Card.primaryKey = 'itemid';

Card.FIXTURES = [{
	'itemid': Card.TYPES.ImageWithDoubleFieldDoubleLines,
	'card_type': Card.TYPES.ImageWithDoubleFieldDoubleLines,
	'scheme': 'sinaweibo://pageinfo?containerid=10012099788',
	'pb_model': true,

	'title_sub': '这里是标题title_sub，最多一行，超出打点。这里是标题title_sub，最多一行，超出打点。',
	'desc': '这里是说明desc，最多一行，超出打点。这里是说明desc，最多一行，超出打点。',
	'pic': ''
}, {
	'itemid': Card.TYPES.ImageWithDoubleFieldTripleLines,
	'card_type': Card.TYPES.ImageWithDoubleFieldTripleLines,
	'scheme': 'http://weibo.com',
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
}];

export default Card;