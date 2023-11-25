import BaseComponent from '../../base-component';
import Link from '../../link/link';
import './header-menu-link.scss';

export default class HeaderMenuLink extends Link {
  constructor() {
    super('', ['header__menu-link', 'link--inline', 'header__link'], '/');

    this.node.append(this.createMenuLinkTitle(), this.createMenuLinkLogo());
  }

  private createMenuLinkTitle() {
    return new BaseComponent(
      'p',
      ['header__menu-link-title'],
      'Menu'
    ).getNode();
  }

  private createMenuLinkLogo() {
    return new BaseComponent('div', ['header__menu-link-logo']).getNode();
  }
}
