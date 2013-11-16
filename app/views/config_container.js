import ConfigTextField from 'appkit/views/config_textfield';
import ConfigSelect from 'appkit/views/config_select';

var ConfigContainerView = Ember.View.extend({
	classNames: ['config-container-view'],
	templateName: 'config_container',
	
	configViewType: function(){
		var type = this.get('config.viewType');
		if (type === 'text-field') return ConfigTextField;
		if (type === 'text-view') return Ember.TextArea;
		if (type === 'select') return ConfigSelect;
		return Ember.TextField;
	}.property('config.viewType'),
});

export default ConfigContainerView;