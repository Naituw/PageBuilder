var CardContainerView = Ember.View.extend({
	classNameBindings: [':card-container','isBubble:bubble-style:default-style'],
	templateName: 'card_container',
	isBubble: function(){
		return this.get('page.show_style') === 1;
	}.property('page.show_style'),
});

export default CardContainerView;