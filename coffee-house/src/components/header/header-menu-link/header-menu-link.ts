import BaseComponent from '../../base-component';
import Link from '../../link/link';
import MenuLogo from '../../menu-logo/menu-logo';
import './header-menu-link.scss';

export default class HeaderMenuLink extends Link {
  constructor() {
    super(
      '',
      [
        'header__menu-link',
        'link--inline',
        'link--inline_dark',
        'header__link',
      ],
      '/menu'
    );

    this.node.append(this.createMenuLinkTitle(), new MenuLogo().getNode());
  }

  private createMenuLinkTitle() {
    return new BaseComponent(
      'p',
      ['header__menu-link-title'],
      'Menu'
    ).getNode();
  }
}
