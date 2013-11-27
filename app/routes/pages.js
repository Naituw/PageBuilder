import Page from 'appkit/models/page';

var PagesRoute = Ember.Route.extend({
  model: function(params) {
    return Page.fetch();
  },
});

export default PagesRoute;
