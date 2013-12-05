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
		MultiLineText: [{
			name: '内容文字',
			path: 'desc',
			viewType: 'text-view',
		}, {
			name: '来源文字',
			path: 'source',
		}],
		Button: [{
			name: '按钮标题',
			path: 'desc',
		}, {
			name: '按钮样式',
			path: 'show_type',
			viewType: 'select',
			options: [
				{title: '普通', value: 0},
				{title: '蓝色', value: 1},
				{title: '绿色', value: 2},
				{title: '红色', value: 3},
				{title: '高亮白色', value: 4},
			],
		}],
		SearchCard: [{
			name: '搜索占位文字',
			path: 'desc',
		}],
		GridButton: [{
			name: '子按钮',
			path: 'group',
			viewType: 'add-button',
			maxCount: 6,
			itemDefault: {
				title_sub: '标题',
			},
		}],
	}, 
});

export default Card.CONFIGURABLES;