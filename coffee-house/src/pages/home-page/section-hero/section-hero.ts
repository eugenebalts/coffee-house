import BaseComponent from '../../../components/base-component';
import Link from '../../../components/link/link';
import MenuLogo from '../../../components/menu-logo/menu-logo';
import './section-hero.scss';

export default class SectionHero extends BaseComponent<'section'> {
  constructor() {
    super('section', ['main__section', 'section_hero']);

    this.node.append(this.createMarkup());
  }

  private createMarkup() {
    const sectionWrapper = new BaseComponent('div', [
      'section__wrapper',
      'section_hero__wrapper',
    ]).getNode();

    const sectionTitle = this.createSectionTitle();
    const sectionSubtitle = new BaseComponent(
      'p',
      ['section__subtitle', 'section__subtitle_light'],
      `With its inviting atmosphere and delicious coffee options,
      the Coffee House Resource is a popular destination for coffee
      lovers and those seeking a warm and inviting space to enjoy
      their favorite beverage.`
    ).getNode();

    const sectionButton = this.createSectionButton();

    sectionWrapper.append(sectionTitle, sectionSubtitle, sectionButton);

    return sectionWrapper;
  }

  private createSectionTitle() {
    const sectionTitle = new BaseComponent('h1', [
      'section__title',
      'section__title_light',
    ]).getNode();
    sectionTitle.innerHTML = `<i>Enjoy</i> premium coffee at our charming cafe`;

    return sectionTitle;
  }

  private createSectionButton() {
    const sectionButton = new Link(
      '',
      [
        'link--button',
        'link--button_light',
        'link--button_light-filled',
        'section_hero__button',
      ],
      '/'
    ).getNode();

    const buttonTitle = new BaseComponent(
      'p',
      ['button__title'],
      'Menu'
    ).getNode();

    const buttonIcon = new MenuLogo().getNode();

    sectionButton.append(buttonTitle, buttonIcon);

    return sectionButton;
  }
}
