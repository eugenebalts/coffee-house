import BaseComponent from '../../components/base-component';
import SectionHero from './section-hero/section-hero';
import './home-page.scss';
import '../pages.scss';
import SectionFavorite from './section-favorite/section-favorite';
import SectionAbout from './section-about/section-about';

export default class HomePage extends BaseComponent<'div'> {
  constructor() {
    super('div', ['container']);

    this.node.append(this.createMarkup());
  }

  private createMarkup() {
    const wrapper = new BaseComponent('div', ['main__wrapper']).getNode();

    const sectionHero = new SectionHero().getNode();
    const sectionFavorite = new SectionFavorite().getNode();
    const sectionAbout = new SectionAbout().getNode();

    wrapper.append(sectionHero, sectionFavorite, sectionAbout);

    return wrapper;
  }
}
