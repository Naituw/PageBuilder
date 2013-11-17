var PBModel = Ember.Model.extend({
	get: function(key){
		var value = Ember.get(this, key);
		if (value) return value;
		var data = this._data;
		if (!data) return undefined;
		return data[key];
	},
});

export default PBModel;