import BaseComponent from '../../../components/base-component';
import Link from '../../../components/link/link';
import './section-app.scss';

export default class SectionApp extends BaseComponent<'section'> {
  constructor() {
    super('section', ['main__section', 'section_app']);

    this.node.append(this.createMarkup());
    this.node.id = 'section_app';
  }

  private createMarkup() {
    const wrapper = new BaseComponent('div', [
      'section__wrapper',
      'section_app__wrapper',
    ]).getNode();

    const content = this.createContent();

    const background = new BaseComponent('div', [
      'section_app__background',
    ]).getNode();

    wrapper.append(content, background);

    return wrapper;
  }

  private createContent() {
    const contentWrapper = new BaseComponent('div', [
      'section_app__content',
    ]).getNode();

    const title = new BaseComponent('h2', [
      'section__title',
      'section__title-h2',
      'section__title-dark',
    ]).getNode();

    title.innerHTML = `<span>Download</span> our apps to start ordering`;

    const description = new BaseComponent(
      'p',
      ['section__description'],
      `Download the Resource app today and
      experience the comfort of ordering your
      favorite coffee from wherever you are`
    ).getNode();

    const appStoreBtn = this.createAppStoreBtn();
    const googleMarketBtn = this.createGoogleMarketBtn();

    const navigation = new BaseComponent('div', [
      'section_app__navigation',
    ]).getNode();

    navigation.append(appStoreBtn, googleMarketBtn);

    contentWrapper.append(title, description, navigation);

    return contentWrapper;
  }

  private createAppStoreBtn() {
    const button = new BaseComponent(
      'button',
      ['link', 'link--button', 'link--button_dark', 'section_app__button'],
      ''
    ).getNode();

    const buttonTitle = new BaseComponent('p', [
      'section_app__button-title',
    ]).getNode();

    buttonTitle.innerHTML = 'Available on the <br><b>App Store</b>';

    const buttonIcon = new BaseComponent('div', [
      'section_app__button-icon',
      'section_app__button-icon_as',
    ]).getNode();

    button.append(buttonIcon, buttonTitle);

    return button;
  }

  private createGoogleMarketBtn() {
    const button = new BaseComponent('button', [
      'link',
      'link--button',
      'link--button_dark',
      'section_app__button',
    ]).getNode();

    const buttonTitle = new BaseComponent('p', [
      'section_app__button-title',
    ]).getNode();

    buttonTitle.innerHTML = 'Available on <br><b>Google Play</b>';

    const buttonIcon = new BaseComponent('div', [
      'section_app__button-icon',
      'section_app__button-icon_gm',
    ]).getNode();

    button.append(buttonIcon, buttonTitle);

    return button;
  }
}
