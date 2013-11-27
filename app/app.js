import Resolver from 'resolver';

var App = Ember.Application.extend({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver.default
});

Ember.RSVP.configure('onerror', function(error) {
  // ensure unhandled promises raise awareness.
  // may result in false negatives, but visibility is more imporant
  if (error instanceof Error) {
    Ember.Logger.assert(false, error);
    Ember.Logger.error(error.stack);
  }
});

App.reopen({
  loadingCount: 0,
  beginLoading:function(){
    this.set('loadingCount', this.get('loadingCount') + 1);
  },
  endLoading: function(){
    var count = this.get('loadingCount');
    if (count > 0) {
      this.set('loadingCount', count - 1);
    }
  },
  loading: function(){
    return this.get('loadingCount') > 0;
  }.property('loadingCount'),
});

export default App;
