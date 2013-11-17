var ConfigSelectView = Ember.Select.extend({
	classNames: ['config-select'],
	optionLabelPath: 'content.title',
	optionValuePath: 'content.value',
	contentBinding: 'config.options',
	bindingPath: function(){
		var path = this.get('config.path');
		return 'targetModel.' + path;
	}.property('config.path'),
	valueChanged: function(){
		var path = this.get('config.path');
		var target = this.get('targetModel');
		target.set(path, this.get('value'));
	}.observes('value'),
	didInsertElement: function(){
		var that = this;
		var updateCurrentValue = function(){
			var current = that.get(that.get('bindingPath'));
			that.set('value', current);
		};
		updateCurrentValue();
		that.addObserver(that.get('bindingPath'), updateCurrentValue);
	},
});

export default ConfigSelectView;