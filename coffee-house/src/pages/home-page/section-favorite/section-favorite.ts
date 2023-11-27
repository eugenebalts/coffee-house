import BaseComponent from '../../../components/base-component';
import './section-favorite.scss';
import '../../pages.scss';
import Slider from '../../../components/slider/slider';
import FAVORITE_DRINKS from '../../../constants/drinks';

export default class SectionFavorite extends BaseComponent<'section'> {
  constructor() {
    super('section', ['section_favorite', 'main__section']);

    this.node.append(this.createMarkup());
  }

  private createMarkup() {
    const wrapper = new BaseComponent('div', [
      'section__wrapper',
      'section_favorite__wrapper',
    ]).getNode();

    const title = this.createSectionTitle();
    const slider = new Slider(FAVORITE_DRINKS).getNode();

    wrapper.append(title, slider);

    return wrapper;
  }

  private createSectionTitle() {
    const sectionTitle = new BaseComponent('h2', [
      'section__title',
      'section__title-h2',
      'section__title_dark',
    ]).getNode();

    sectionTitle.innerHTML = `Choose your <i>favorite</i> coffee`;

    return sectionTitle;
  }
}
