import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

// Initializer for injecting the Storage Object
App.initializer({
    name: "injectStorage",
    initialize: function(application) {
        // Injecting router into all components for transition control
        application.inject('component', 'router', 'router:main');
        Ember.Logger.log('initialise ... ');
    }
});
	
loadInitializers(App, config.modulePrefix);

export default App;
