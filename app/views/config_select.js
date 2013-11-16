var ConfigSelectView = Ember.Select.extend({
	classNames: ['config-select'],
	optionLabelPath: 'content.title',
	optionValuePath: 'content.value',
	contentBinding: 'config.options',
});

export default ConfigSelectView;