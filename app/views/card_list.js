import Card from 'appkit/models/card';

var CardListView = Ember.View.extend({
	classNameBindings: [':card-list', 'draggingOver:dragging-over'],
	templateName: 'card_list',
	lastDraggingOffset: 0,
	lastDraggingIndex: -1,
	lastDraggingViewHeight: 0,
	draggingOver: false,
	dragHoverStart: function(e){
		e.originalEvent.dataTransfer.dropEffect = 'copy';
		this.set('draggingOver', true);
	},
	dragHoverEnd: function(e){
		this.set('draggingOver', false);
		this.lastDraggingOffset = 0;
		this.lastDraggingIndex = -1;
		this.updateWithDraggingIndex();
		this.get('draggingTargetCollention').clear();
	},
	dataFromEvent: function(e) {
		return JSON.parse(e.originalEvent.dataTransfer.getData('text/plain'));
	},
	draggingTargetCollention: Em.A(),
	dragEnter: function(e){
		e.preventDefault();
		if (!this.get('draggingTargetCollention.length')) {
			this.dragHoverStart(e);
		}
		this.get('draggingTargetCollention').pushObject(e.target);
		return false;
	},
	dragLeave: function(e){
		e.preventDefault();
		
		Ember.run.next(this, function() {
			this.get('draggingTargetCollention').removeObject(e.target);
			if (!this.get('draggingTargetCollention.length')) {
				this.dragHoverEnd(e);
			}
		});

		return false;
	},
	dragOver: function(e){
		e.preventDefault();

		if (!this.get('draggingOver')) {
			this.dragHoverStart(e);
		}

		var $this = this.$();

		var posY = $(e.currentTarget).offset().top;
        var y = e.originalEvent.pageY - posY;

        if (y !== this.lastDraggingOffset)
        {
			this.lastDraggingOffset = y;

			var result = -1;

			var cardViews = $this.find('.card-container');
			var viewCount = cardViews.length;
			var hiddingCount = 0;
			for (var i = 0; i < viewCount; i++) {
				var view = $(cardViews[i]);

				if (view.hasClass('hide-for-dragging')) {
					hiddingCount++;
					continue;
				}

				var height = view.outerHeight(true);
				if (y > height) {
					y -= height;
				} else {
					if (y > height / 2) result = i + 1;
					else result = i;

					break;
				}
			}

			if (result === -1) {
				result = viewCount - hiddingCount;
			} else {
				result -= hiddingCount;
			}

			if (result !== this.lastDraggingIndex) {
				this.lastDraggingIndex = result;
				this.updateWithDraggingIndex();
			}
        }

		return false;
	},
	drop: function(e){
		var data = this.dataFromEvent(e);
		var card = data['card'];
		var page = this.get('page');
		var cards = page.get('cards');

		var existingCard = cards.findBy('itemid', card['itemid']);
		var targetIndex = this.get('dropIndex');

		if (targetIndex < 0) return;

		if (existingCard) {
			var needsBeSelected = this.get('controller.selectedItem') === existingCard;

			// moving card, delete old first
			cards.removeObject(existingCard);
			var newCard = Card.createWithMeta(existingCard.toJSON());
			cards.insertAt(targetIndex, newCard);

			if (needsBeSelected) {
				this.set('controller.selectedItem', newCard);
			}
		} else {
			// adding card, update item id
			card.itemid = new Date().getTime();
			cards.insertAt(targetIndex, Card.createWithMeta(card));
		}

		this.dragHoverEnd();
	},

	updateWithDraggingIndex: function(){
		var index = this.lastDraggingIndex;
		this.set('dropIndex', index);
	},
	dropIndex: -1,
});

export default CardListView;