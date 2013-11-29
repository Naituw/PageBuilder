var ConfigCheckbox = Ember.Checkbox.extend({
	classNames: ['config-checkbox'],
	elementInserted: false,
	attributeBindings: ['disabled'],
	bindingPath: function(){
		var path = this.get('config.path');
		return 'targetModel.' + path;
	}.property('config.path'),
	disablePath: function(){
		var path = this.get('config.disable.path');
		return 'targetModel.' + path;
	}.property('config.disable.path'),
	valueChanged: function(){
		if (!this.get('elementInserted')) return;
		var path = this.get('config.path');
		var target = this.get('targetModel');
		target.set(path, this.get('checked') ? 1 : 0);
	}.observes('checked'),
	updateCurrentValue: function() {
		var that = this;
		var current = that.get(that.get('bindingPath'));
		that.set('checked', !!current);
	},
	updateDisableValue: function(){
		var current = this.get(this.get('disablePath'));
		var value = this.get('config.disable.value');
		this.set('disabled', current === value);
	},
	didInsertElement: function(){
		var that = this;
		this.updateCurrentValue();
		that.addObserver(that.get('bindingPath'), this.updateCurrentValue);

		if (this.get('config.disable')) {
			this.updateDisableValue();
			this.addObserver(this.get('disablePath'), this.updateDisableValue);
		}

		Em.run.next(this, function(){
			this.set('elementInserted', true);
		});
	},
	willDestroyElement: function(){
		this.removeObserver(this.get('bindingPath'), this.updateCurrentValue);
		this.removeObserver(this.get('disablePath'), this.updateDisableValue);
	},
});

export default ConfigCheckbox;