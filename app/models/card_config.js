import Card from 'appkit/models/card';

Card.reopenClass({
	CONFIGURABLES: [{
		name: '标题',
		path: 'title',
		viewType: 'text-field',
	}, {
		name: 'Scheme',
		path: 'scheme',
		viewType: 'text-field',
	}],
	SUB_CONFIGURABLES: {
		ImageWithDoubleFieldDoubleLines: [{
			name: '首行文字',
			path: 'title_sub',
		}, {
			name: '描述',
			path: 'desc',
		}, {
			name: '图片地址',
			path: 'pic',
		}],
	},
});

export default Card.CONFIGURABLES;