import Page from 'appkit/models/page';

var PageRoute = Ember.Route.extend({
  model: function(params) {
    return Page.find(params.page_id);
  }
});

export default PageRoute;