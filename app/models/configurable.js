var attr = Ember.attr;

var Configurable = Ember.Model.extend({
	path: attr('string'),
	name: attr('string'),
	viewType: attr('string'),

	isTextField: function(){
		return this.get('viewType') === 'text-field';
	}.property('viewType'),
	isTextView: function(){
		return this.get('viewType') === 'text-view';
	}.property('viewType'),
	isSelect: function(){
		return this.get('viewType') === 'select';
	}.property('viewType'),
});

export default Configurable;