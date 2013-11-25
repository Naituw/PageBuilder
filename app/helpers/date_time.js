var dateTime = Ember.Handlebars.makeBoundHelper(function(millisecs) {
	if (!millisecs) return 'Unknown';
	var date = new Date(millisecs);
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();

	var twoDigit = function(x) {
		return '' + (x < 10 ? ('0' + x) : x);
	};

	return twoDigit(month) + '月' + twoDigit(day) + '日 ' + twoDigit(hours) + ':' + twoDigit(minutes);
});

export default dateTime;
