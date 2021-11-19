import Adapt from 'core/js/adapt';
import LogoView from './logoView';

class Logo extends Backbone.Controller {

  initialize() {
    this.listenToOnce(Adapt, 'app:dataReady', this.onAppDataReady);
  }

  onAppDataReady() {
    this.listenTo(Adapt.config, 'change:_activeLanguage', this.onLangChange);

    if (!Adapt.course.get('_logo')) return;

    if (Adapt.course.get('_logo')._isEnabled) {
      this.setupLogo();
      this.setupListeners();
    }
  }

  onLangChange() {
    this.removeListeners();
    this.listenToOnce(Adapt, 'app:dataReady', this.onAppDataReady);
  }

  setupLogo() {
    this.config = Adapt.course.get('_logo');
  }

  setupListeners() {
    this.listenTo(Adapt, 'navigationView:postRender', this.renderLogoView);
  }

  removeListeners() {
    this.stopListening(Adapt, 'navigationView:postRender', this.renderLogoView);
    this.stopListening(Adapt.config, 'change:_activeLanguage', this.onLangChange);
  }

  renderLogoView() {
    const logoModel = new Backbone.Model(this.config);

    // Check position
    if (this.config._position == "left" || this.config._position == "right") {
      $('.nav__inner').prepend(new LogoView({
        model: logoModel
      }).$el);
    } else {
      $('.nav__inner').append(new LogoView({
        model: logoModel
      }).$el);
    }
  }
}

export default Adapt.logo = new Logo();
