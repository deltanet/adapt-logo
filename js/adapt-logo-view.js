define(function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');

    var LogoView = Backbone.View.extend({

        className: 'logo',

        initialize: function() {
            this.listenTo(Adapt, 'remove', this.remove);
            this.listenTo(Adapt, 'device:changed', this.setupLogo);
            this.render();
        },

        render: function() {
            var data = this.model.toJSON();
            var template = Handlebars.templates["logo"];

            // Check position
            if(Adapt.course.get('_logo')._position == "left" || Adapt.course.get('_logo')._position == "right") {
              this.$el.html(template(data)).prependTo('.navigation'+'>.navigation-inner');
            } else {
              this.$el.html(template(data)).appendTo('.navigation'+'>.navigation-inner');
            }

            this.image = "";
            this.title = "";

            this.setupLogo();

            return this;
        },

        setupLogo: function () {
          this.deviceSize = Adapt.device.screenSize;
          this.image = "";
          this.title = "";
          // Add image if enabled
          if(Adapt.course.get('_logo')._graphic._isEnabled) {
            // Check device size
            switch (this.deviceSize) {
            case "large":
              this.image = Adapt.course.get('_logo')._graphic._large;
              break;
            case "medium":
              this.image = Adapt.course.get('_logo')._graphic._medium;
              break;
            default:
              // If "small"
              this.image = Adapt.course.get('_logo')._graphic._small;
            }
            // Add image
            this.$('img').attr('src', this.image);
          }
          // add title if enabled
          if(Adapt.course.get('_logo')._title._isEnabled) {
            // Check device size
            switch (this.deviceSize) {
            case "large":
              this.title = Adapt.course.get('_logo')._title.large;
              break;
            case "medium":
              this.title = Adapt.course.get('_logo')._title.medium;
              break;
            default:
              // If "small"
              this.title = Adapt.course.get('_logo')._title.small;
            }
            // Add title
            this.$('.course-title').html(this.title);
          }

          // Add class to logo
          this.$el.addClass(Adapt.course.get('_logo')._position);

          // Hide elements if they are empty
          if(this.image == "") {
            this.$('.course-logo').hide();
          } else {
            this.$('.course-logo').show();
          }

          if(this.title == "") {
            this.$('.course-title').hide();
          } else {
            this.$('.course-title').show();
          }

        }

    });

    return LogoView;

});
