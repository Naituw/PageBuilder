import CardCategory from 'appkit/models/card_category';
import Card from 'appkit/models/card';

var PageController = Em.ObjectController.extend({
	selectedItem: null,

// components
	categories: function(){
		return CardCategory.find();
	}.property('model'),
	selectedCategory: CardCategory.find(1),
	cardModels: function(){
		var categroy = this.get('selectedCategory');

		if (!categroy) return [];

		var card_types = categroy.get('card_types');

		if (!card_types) return [];

		var result = [];

		for (var i = 0; i < card_types.length; i++) {
			var type = card_types[i];
			var card = Card.find(type);

			if (card){
				result.pushObject(card);
			}
		}
		return result;
	}.property('selectedCategory.isLoaded'),

// canvas & inspector
	pageSelected: function(){
		return this.get('model') === this.get('selectedItem');
	}.property('model','selectedItem'),
	actions: {
		selectPage: function(){
			this.set('selectedItem', this.get('model'));
		},
	},
});

export default PageController;