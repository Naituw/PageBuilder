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

		}],
	},
});