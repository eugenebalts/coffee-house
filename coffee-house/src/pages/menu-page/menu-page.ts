import BaseComponent from '../../components/base-component';

export default class MenuPage extends BaseComponent<'div'> {
  constructor() {
    super('div', ['container']);

    this.node.append(this.createMarkup());
  }

  private createMarkup() {
    const wrapper = new BaseComponent('div', ['main__wrapper']).getNode();

    wrapper.append();

    return wrapper;
  }
}
