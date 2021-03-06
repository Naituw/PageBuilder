import Card from 'appkit/models/card';
import PBModel from 'appkit/models/model';

var attr = Ember.attr;

var CardCategory = PBModel.extend({
	id: attr('number'),
	name: attr('string'),
});

CardCategory.adapter = Ember.FixtureAdapter.create();

CardCategory.FIXTURES = [{
	id: 1,
	name: '图文类型',
	card_types: [
		Card.TYPES.ImageWithDoubleFieldDoubleLines,
		Card.TYPES.ImageWithDoubleFieldTripleLines,
		Card.TYPES.SingleLargePhoto,
		Card.TYPES.MultiLineText,
	],
}, {
	id: 2,
	name: '按钮类型',
	card_types: [
		Card.TYPES.SingleText,
		Card.TYPES.Button,
		Card.TYPES.SearchCard,
		Card.TYPES.GridButton,
	],
}];

export default CardCategory;