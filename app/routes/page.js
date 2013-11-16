var PageRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('page', params.page_id);
  }
});

export default PageRoute;