import BaseComponent from '../base-component';
import './logo.scss';

export default class Logo extends BaseComponent<'div'> {
  constructor() {
    super('div', ['logo']);

    this.node.append(this.createMarkup());
  }

  private createMarkup() {
    const logoLink = new BaseComponent('a', ['logo__link']).getNode();

    return logoLink;
  }
}
