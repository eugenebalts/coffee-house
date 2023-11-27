import BaseComponent from '../../components/base-component';
import SectionMenu from './section-menu.ts/section-menu';

class MenuPage extends BaseComponent<'div'> {
  constructor() {
    super('div', ['container']);

    this.node.append(this.createMarkup());
  }

  private createMarkup() {
    const wrapper = new BaseComponent('div', ['main__wrapper']).getNode();

    const sectionMenu = new SectionMenu().getNode();

    wrapper.append(sectionMenu);

    return wrapper;
  }
}

export default new MenuPage().getNode();
