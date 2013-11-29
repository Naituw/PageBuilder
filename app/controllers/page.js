import CardCategory from 'appkit/models/card_category';
import Card from 'appkit/models/card';
import CardCONFIGURABLES from 'appkit/models/card_config';
import Page from 'appkit/models/page';

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
	revertModel: function(){
		Em.run.next(this, function(){
			window.location.reload();
		});
		/*
		var model = this.get('model');
		var cards = model.get('cards');
		var apps = model.get('pb_page_apps');
		for (var i = cards.get('length') - 1; i >= 0; i--) {
			var c = cards.objectAt(i);
			if (c.get('isNew')) {
				cards.removeAt(i);
			}
		}
		for (var j = apps.get('length') - 1; j >= 0; j--) {
			var a = apps.objectAt(j);
			if (a.get('isNew')) {
				apps.removeAt(j);
			}
		}
		model.revert();*/
	},
	actions: {
		selectPage: function(){
			this.set('selectedItem', this.get('model'));
			return false;
		},
		revertPage: function(){
			this.revertModel();
		},
		downloadPage: function(){

		},
		savePage: function(){
			Em.App.beginLoading();
			var page = this.get('model');
			Page.adapter.saveRecord(page).then(function(){
				Em.App.endLoading();
			}, function(){
				Em.App.endLoading();
			});
		},
		exitEditor: function(){
			this.transitionToRoute('pages');
		},
		removeSelectedItem: function(){
			// only cards & apps can be removed currently
			this.get('model.cards').removeObject(this.get('selectedItem'));
			this.get('model.pb_page_apps').removeObject(this.get('selectedItem'));
			this.set('selectedItem', null);
		},
		createApp: function(){
			this.get('model.pb_page_apps').create({
				title: '标题',
				scheme: 'http://weibo.com',
			});
			Em.run.later(this, function(){
				this.set('selectedItem', this.get('model.pb_page_apps.lastObject'));
			});
			return false;
		},
	},
});

export default PageController;