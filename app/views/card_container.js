var CardContainerView = Ember.View.extend({
	classNameBindings: [':card-container','isBubble:bubble-style:default-style', 'card.hideForDragging:hide-for-dragging', 'showsTitle:title-visible'],
	templateName: 'card_container',
	attributeBindings: ['draggable'],
	draggable: "true",
	showsTitle: function(){
		if (!this.get('isBubble')) return false;
		return this.get('card.title.length') > 0;
	}.property('card.title', 'isBubble'),
	isBubble: function(){
		return this.get('page.show_style') === 1;
	}.property('page.show_style'),
	selectable: function(){
		return !this.get('isModel');
	}.property('isModel'),
	selected: function(){
		return this.get('controller.selectedItem') === this.get('card');
	}.property('controller.selectedItem'),
	click: function(e) {
		if (this.get('selectable')) {
			this.get('controller').set('selectedItem', this.get('card'));
		}
		return false;
	},
	dragStart: function(e){
		var card = this.get('card').toJSON();
		var height = this.$().outerHeight(true);
		var data = {
			'card': card,
			'height': height,
		};

		if (this.get('isModel'))
		{
			e.originalEvent.dataTransfer.effectAllowed = 'copy';
			data['type'] = 'card-model';
		}
		else
		{
			e.originalEvent.dataTransfer.effectAllowed = 'move';
			data['type'] = 'card';

			Em.run.next(this, function(){
				this.set('card.hideForDragging', true);
			});
		}
		e.originalEvent.dataTransfer.setData('text/plain', JSON.stringify(data));
		this.set('controller.lastDraggingViewHeight', height);
	},
	dragEnd: function(e){
		e.preventDefault();
		this.set('card.hideForDragging', false);
		return false;
	},
});

export default CardContainerView;