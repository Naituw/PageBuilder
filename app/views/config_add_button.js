var ConfigAddButton = Em.View.extend({
	tagName: 'button',
	classNames: ['config-add-button'],
	templateName: 'config_add_button',
	attributeBindings: ['disabled'],
	disabled: false,

	bindingPath: function(){
		var path = this.get('config.path');
		return 'targetModel.' + path;
	}.property('config.path'),
	updateDisableValue: function(){
		var max = this.get('config.maxCount');
		if (!max) {
			this.set('disabled', false);
			return;
		}
		this.set('disabled', max <= this.get(this.get('bindingPath')).get('length'));
	},
	didInsertElement: function(){
		var that = this;
		if (this.get('config.maxCount')) {
			this.updateDisableValue();
			this.addObserver(this.get('bindingPath') + '.length', this.updateDisableValue);
		}
	},
	willDestroyElement: function(){
		this.removeObserver(this.get('bindingPath') + '.length', this.updateDisableValue);
	},


	click: function(){
		if (this.get('disabled')) return;

		this.get(this.get('bindingPath')).create(this.get('config.itemDefault'));
	},
});

export default ConfigAddButton;