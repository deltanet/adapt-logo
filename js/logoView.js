import Adapt from 'core/js/adapt';

export default class LogoView extends Backbone.View {

  className() {
    return 'logo '+this.model.get('_position');
  }

  events() {
    return {
      'click .js-nav-logo-btn': 'onClick'
    };
  }

  initialize() {
    this.listenTo(Adapt.config, 'change:_activeLanguage', this.remove);
    this.listenTo(Adapt, 'device:changed', this.setupLogo);
    this.render();
  }

  render() {
    const data = this.model.toJSON();
    const template = Handlebars.templates['logo'];
    this.$el.html(template(data));

    this.image = "";
    this.title = "";

    this.setupLogo();
  }

  setupLogo() {
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
      this.$('.logo__title').html(this.title);
    }

    // Hide elements if they are empty
    if (this.image == "") {
      this.$('.logo__image').hide();
    } else {
      this.$('.logo__image').show();
    }

    if (this.title == "") {
      this.$('.logo__title').hide();
    } else {
      this.$('.logo__title').show();
    }
  }

  onClick(event) {
    const currentId = Adapt.location._currentId;
    const parentId = Adapt.contentObjects.findWhere({ _id: currentId }).get('_parentId');

    // Don't continue if the page is in the root of the course
    if (parentId === "course") return;

    if (this.model.get('_link')._parentPage) {
      Adapt.router.navigateToParent();
    }
  }
}
