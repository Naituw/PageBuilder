var PageInfoView = Em.View.extend({
	pageInfo: null,
	page: null,
	classNameBindings: [':page-info-container', 'pageInfoSelected:selected'],
	templateName: 'page_info',

	backgroundStyle: function(){
		var url = this.get('pageInfo.background_client');
		if (!url) {
			var i = null;
			var s = this.get('page.page_type');
			if (s === '01') {
				i = 'poi';
			} else if (s === '02') {
				i = 'book';
			} else if (s === '04') {
				i = 'app';
			} else if (s === '05') {
				i = 'default';
			} else if (s === '07') {
				i = 'game';
			} else if (s === '08') {
				i = 'topic';
			} else if (s === '11') {
				i = 'radio';
			} else if (s === '13') {
				i = 'tv';
			} else if (s === '15') {
				i = 'music';
			} else if (s === '17') {
				i = 'car';
			} else if (s === '18') {
				i = 'app';
			} else if (s === '20') {
				i = 'movie';
			}
			if (i) {
				url = 'assets/images/covers/page_cover_' + i + '_background.jpg';
			}
		}
		if (!url) return '';
		return 'background-image:url(' + url + ')';
	}.property('pageInfo.background_client', 'page.page_type'),

	pageInfoSelected: function(){
		if (!this.get('pageInfo')) return false;
		return this.get('controller.selectedItem') === this.get('pageInfo');
	}.property('controller.selectedItem', 'pageInfo'),

	click: function(){
		this.set('controller.selectedItem', this.get('pageInfo'));
		return false;
	},
});

export default PageInfoView;