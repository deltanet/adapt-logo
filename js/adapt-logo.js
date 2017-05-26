define([
    'coreJS/adapt',
    './adapt-logo-view'
], function(Adapt, LogoView) {

  var Logo = _.extend({

    initialize: function() {
        this.listenToOnce(Adapt, "app:dataReady", this.onDataReady);
    },

    onDataReady: function() {
      this.setupEventListeners();
      this.setupLogo();
    },

    setupEventListeners: function() {
      this.listenTo(Adapt, "router:page router:menu", this.onAddLogo);
    },

    setupLogo: function() {
      if (Adapt.course.get("_logo") && Adapt.course.get("_logo")._isEnabled) {
        this.logoEnabled = Adapt.course.get("_logo")._isEnabled;
      } else {
        this.logoEnabled = false;
      }
    },

    onAddLogo: function(pageModel) {
      if (this.logoEnabled) {
          new LogoView({model:pageModel});
      }
    }

  }, Backbone.Events);

    Logo.initialize();

    return Logo;

})
