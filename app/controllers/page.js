import CardCategory from 'appkit/models/card_category';
import Card from 'appkit/models/card';
import CardCONFIGURABLES from 'appkit/models/card_config';

var PageController = Em.ObjectController.extend({
	selectedItem: null,
	
	pageChanged: function(){
		this.set('selectedItem', null);
	}.observes('model.containerid'),

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
		revertPage: function(){
			var page = this.get('model');
			page.get('cards').clear();
			page.revert();
		},
		downloadPage: function(){

		},
		savePage: function(){
			this.get('model').save();
		},
		exitEditor: function(){
			this.transitionToRoute('pages');
		},
		removeSelectedItem: function(){
			// only cards can be removed currently
			this.get('model.cards').removeObject(this.get('selectedItem'));
			this.set('selectedItem', null);
		},
	},
});

export default PageController;