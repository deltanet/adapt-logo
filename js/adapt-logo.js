define([
  'coreJS/adapt'
], function(Adapt) {

	var LogoView = Backbone.View.extend({

		initialize: function() {
      this.listenTo(Adapt, 'device:changed', this.render);
			this.render();
		},

    render: function () {
      // Check device size
      var deviceSize = Adapt.device.screenSize;
      switch (deviceSize) {
      case "small":
        this.image = 'url('+Adapt.course.get('_logo')._small+')';
        break;
      case "medium":
        this.image = 'url('+Adapt.course.get('_logo')._medium+')';
        break;
      default:
        // If "large"
        this.image = 'url('+Adapt.course.get('_logo')._large+')';
      }

      $(".navigation-inner").css({
        "background-image": this.image,
        "background-position": Adapt.course.get('_logo')._position,
        "background-repeat": "no-repeat"
      });

    }

	});

	Adapt.once("adapt:initialize", function() {
		var config = Adapt.course.get("_logo");

		if (!config) return;

		if (config._isEnabled) {
			new LogoView({ model: new Backbone.Model(config) });
		}

	});

});
