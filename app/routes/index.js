var IndexRoute = Ember.Route.extend({
	beforeModel: function(){
		this.transitionTo('pages');
	},
});

export default IndexRoute;
