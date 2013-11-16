import PBModel from 'appkit/models/model';

var attr = Ember.attr;
var Card = PBModel.extend({
	title_top: attr('string'),
	show_style: attr('number'),
	cards: Ember.hasMany('card'),
});

Card.FIXTURES = [{
	'id': 1000,
	'title_top': '理想国际大厦',
	'show_style': 0,
	'cards': [],
	'configurables': [],
}, {
	'id': 1001,
	'title_top': '朔黄铁路大厦',
	'show_style': 0,
	'cards': [],
	'configurables': [],
}];

Ember.Card = Card;

export default Card;