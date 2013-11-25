var ConfigTextAreaView = Ember.TextArea.extend({
	classNames: ['config-textarea'],
	bindingPath: function(){
		var path = this.get('config.path');
		return 'targetModel.' + path;
	}.property('config.path'),
	valueChanged: function(){
		var path = this.get('config.path');
		var target = this.get('targetModel');
		target.set(path, this.get('value'));
	}.observes('value'),

	updateCurrentValue: function() {
		var that = this;
		var current = that.get(that.get('bindingPath'));
		that.set('value', current);
	},
	didInsertElement: function(){
		var that = this;
		this.updateCurrentValue();
		that.addObserver(that.get('bindingPath'), this.updateCurrentValue);
	},
	willDestroyElement: function(){
		this.removeObserver(this.get('bindingPath'), this.updateCurrentValue);
	},
});

export default ConfigTextAreaView;