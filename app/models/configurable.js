var attr = Ember.attr;

var Configurable = Ember.Model.extend({
	path: attr('string'),
	name: attr('string'),
	viewType: attr('string'),
});

export default Configurable;