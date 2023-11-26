import BaseComponent from '../../components/base-component';
import SectionHero from './section-hero/section-hero';
import './home-page.scss';

export default class HomePage extends BaseComponent<'div'> {
  constructor() {
    super('div', ['container', 'main__container']);

    const sectionHero = new SectionHero().getNode();

    this.node.append(sectionHero);
  }
}
