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
		ImageWithDoubleFieldTripleLines: [{
			name: '首行文字',
			path: 'title_sub',
		}, {
			name: '描述',
			path: 'desc',
		}, {
			name: '图片地址',
			path: 'pic',
		}],
		SingleText: [{
			name: '内容标题',
			path: 'desc',
		}, {
			name: '附加内容',
			path: 'desc_extr',
		}, {
			name: '图标URL',
			path: 'pic',
		}, {
			name: '标题对齐',
			path: 'desc_align',
			options: [
				{title: '居左', value: 'left'},
				{title: '居中', value: 'middle'},
				{title: '居右', value: 'right'},
			],
			viewType: 'select'
		}],
		SingleLargePhoto: [{
			name: '内容标题',
			path: 'title_sub',
		}, {
			name: '图片URL',
			path: 'pic',
		}],
	}, 
});

export default Card.CONFIGURABLES;