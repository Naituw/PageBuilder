import Page from 'appkit/models/page';

var PagesRoute = Ember.Route.extend({
  model: function(params) {
    return Page.find();
  }
});

export default PagesRoute;
