import Card from 'appkit/models/card';

var CardView = Ember.View.extend({
	classNames: ['card-view'],
	templatePartialName: function(){
		if (!this.get('card.isLoaded')) return null;
		var type = this.get('card.card_type');
		switch (type){
			case Card.TYPES.ImageWithDoubleFieldDoubleLines: return 'image_doublefield_doublelines';
			case Card.TYPES.ImageWithDoubleFieldTripleLines: return 'image_doublefield_triplelines';
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