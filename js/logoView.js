define([
    'core/js/adapt'
], function(Adapt) {

    var LogoView = Backbone.View.extend({

        className: 'logo',

        events: {
            'click .logo-button': 'onClick'
        },

        initialize: function() {
            this.listenTo(Adapt.config, 'change:_activeLanguage', this.remove);
            this.listenTo(Adapt, 'device:changed', this.setupLogo);
            this.render();
        },

        render: function() {
            var data = this.model.toJSON();
            var template = Handlebars.templates['logo'];

            // Check position
            if (this.model.get('_position') == "left" || this.model.get('_position') == "right") {
                this.$el.html(template(data)).prependTo('.navigation'+'>.navigation-inner');
            } else {
                this.$el.html(template(data)).appendTo('.navigation'+'>.navigation-inner');
            }

            this.image = "";
            this.title = "";

            this.setupLogo();
        },

        setupLogo: function () {
            this.deviceSize = Adapt.device.screenSize;
            this.image = "";
            this.title = "";

            // Add image if enabled
            if (this.model.get('_graphic')._isEnabled) {
              // Check device size
              switch (this.deviceSize) {
              case "large":
                this.image = this.model.get('_graphic')._large;
                break;
              case "medium":
                this.image = this.model.get('_graphic')._medium;
                break;
              default:
                // If "small"
                this.image = this.model.get('_graphic')._small;
              }
              // Add image
              this.$('img').attr('src', this.image);
            }
            // add title if enabled
            if (this.model.get('_title')._isEnabled) {
              // Check device size
              switch (this.deviceSize) {
              case "large":
                this.title = this.model.get('_title').large;
                break;
              case "medium":
                this.title = this.model.get('_title').medium;
                break;
              default:
                // If "small"
                this.title = this.model.get('_title').small;
              }
              // Add title
              this.$('.course-title').html(this.title);
            }

            // Add class to logo
            this.$el.addClass(this.model.get('_position'));

            // Hide elements if they are empty
            if (this.image == "") {
                this.$('.course-logo').hide();
            } else {
                this.$('.course-logo').show();
            }

            if (this.title == "") {
                this.$('.course-title').hide();
            } else {
                this.$('.course-title').show();
            }
        },

        onClick: function(event) {
            if (event && event.preventDefault) event.preventDefault();

            var currentId = Adapt.location._currentId;
            var parentId = Adapt.contentObjects.findWhere({ _id: currentId }).get('_parentId');

            // Don't continue if the page is in the root of the course
            if (parentId === "course") return;

            if (this.model.get('_link')._parentPage) {
              Adapt.trigger('navigation:parentButton');
            }
        }

    });

    return LogoView;

});
