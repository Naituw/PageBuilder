var CardListPlaceholderView = Ember.View.extend({
	classNameBindings:[':card-list-placeholder'],
	placeholderHeight: 0,
	expanded: false,
	dropIndexChanged: function(){
		var index = this.get('listview').$().find('.card-list-placeholder').index(this.$().get(0));
		if (index === this.get('listview.dropIndex'))
		{
			if (!this.get('expanded'))
			{
				this.$().stop().animate({height:this.get('controller.lastDraggingViewHeight')}, 150);
				this.set('expanded', true);
			}
		}
		else if (this.get('expanded'))
		{
			this.$().stop().animate({height:0}, 150);
			this.set('expanded', false);
		}
	}.observes('listview.dropIndex'),
});

export default CardListPlaceholderView;