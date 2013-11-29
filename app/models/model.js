var PBModel = Ember.Model.extend({
	get: function(key){
		var value = this._super(key);
		if (value !== undefined) return value;
		var data = this._data;
		if (!data) return undefined;
		return data[key];
	},
});

export default PBModel;