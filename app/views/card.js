import Card from 'appkit/models/card';

var CardView = Ember.View.extend({
	classNameBindings: [':card-view'],
	templatePartialName: function(){
		if (!this.get('card.isLoaded')) return null;
		var type = this.get('card.card_type');
		switch (type){
			case Card.TYPES.ImageWithDoubleFieldDoubleLines: return 'image_doublefield_doublelines';
			case Card.TYPES.ImageWithDoubleFieldTripleLines: return 'image_doublefield_triplelines';
			case Card.TYPES.SingleText: return 'single_text';
			case Card.TYPES.SingleLargePhoto: return 'single_large_photo';
			case Card.TYPES.MultiLineText: return 'multi_line_text';
			case Card.TYPES.Button: return 'button';
			case Card.TYPES.SearchCard: return 'search_card';
			case Card.TYPES.GridButton: return 'grid_button';
			default: return null;
		}
	}.property('card.card_type', 'card.isLoaded'),
	templateName: function(){
		var partialName = this.get('templatePartialName');
		if (!partialName) return undefined;
		return 'cards/' + partialName;
	}.property('templatePartialName'),
});

export default CardView;