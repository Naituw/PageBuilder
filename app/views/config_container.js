import ConfigTextField from 'appkit/views/config_textfield';
import ConfigSelect from 'appkit/views/config_select';
import ConfigTextArea from 'appkit/views/config_textarea';
import ConfigCheckbox from 'appkit/views/config_checkbox';
import ConfigAddButton from 'appkit/views/config_add_button';

var ConfigContainerView = Ember.View.extend({
	classNames: ['config-container-view'],
	templateName: 'config_container',
	
	configViewType: function(){
		var type = this.get('config.viewType');
		if (type === 'text-field') return ConfigTextField;
		if (type === 'text-view') return ConfigTextArea;
		if (type === 'select') return ConfigSelect;
		if (type === 'checkbox') return ConfigCheckbox;
		if (type === 'add-button') return ConfigAddButton;
		return ConfigTextField;
	}.property('config.viewType'),
});

export default ConfigContainerView;