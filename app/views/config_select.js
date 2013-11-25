var ConfigSelectView = Ember.Select.extend({
	classNames: ['config-select'],
	optionLabelPath: 'content.title',
	optionValuePath: 'content.value',
	contentBinding: 'config.options',
	elementInserted: false,
	bindingPath: function(){
		var path = this.get('config.path');
		return 'targetModel.' + path;
	}.property('config.path'),
	valueChanged: function(){
		if (!this.get('elementInserted')) return;
		var path = this.get('config.path');
		var target = this.get('targetModel');
		target.set(path, this.get('value'));
	}.observes('selection'),
	updateCurrentValue: function() {
		var that = this;
		var current = that.get(that.get('bindingPath'));
		that.set('value', current);
	},
	didInsertElement: function(){
		var that = this;
		this.updateCurrentValue();
		that.addObserver(that.get('bindingPath'), this.updateCurrentValue);

		Em.run.next(this, function(){
			this.set('elementInserted', true);
		});
	},
	willDestroyElement: function(){
		this.removeObserver(this.get('bindingPath'), this.updateCurrentValue);
	},
});

export default ConfigSelectView;