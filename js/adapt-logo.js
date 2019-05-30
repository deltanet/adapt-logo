define([
    'core/js/adapt',
    './logoView'
], function(Adapt, LogoView) {

    var Logo = _.extend({

        initialize: function() {
            this.listenToOnce(Adapt, 'app:dataReady', this.onAppDataReady);
        },

        onAppDataReady: function() {
            this.listenTo(Adapt.config, 'change:_activeLanguage', this.onLangChange);

            if (!Adapt.course.get('_logo')) return;

            if (Adapt.course.get('_logo')._isEnabled) {
                this.setupLogo();
                this.setupListeners();
            }
        },

        onLangChange: function() {
            this.removeListeners();
            this.listenToOnce(Adapt, 'app:dataReady', this.onAppDataReady);
        },

        setupLogo: function() {
            this.config = Adapt.course.get('_logo');
            this.model = new Backbone.Model(this.config);
        },

        setupListeners: function() {
            this.listenTo(Adapt, 'navigationView:postRender', this.renderLogoView);
        },

        removeListeners: function() {
            this.stopListening(Adapt, 'navigationView:postRender', this.renderLogoView);
            this.stopListening(Adapt.config, 'change:_activeLanguage', this.onLangChange);
        },

        renderLogoView: function() {
            new LogoView({model: this.model});
        }

    }, Backbone.Events);

    Logo.initialize();

    return Logo;

});
