var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.route('component-test');
  this.route('helper-test');
  this.resource('pages');
  this.resource('page', {path: '/pages/:page_id'}, function(){
    
  });
});

Router.reopen({
  location: 'history',
});

export default Router;
