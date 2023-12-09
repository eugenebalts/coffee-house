import BaseComponent from '../base-component';
import './burger-menu.scss';

export default class BurgerMenu extends BaseComponent<'div'> {
  constructor() {
    super('div', ['burger-menu', 'link--button', 'link--button_dark']);

    this.createMarkup();
  }

  private createMarkup() {
    this.node.innerHTML = `<span></span><span></span>`;
  }
}
