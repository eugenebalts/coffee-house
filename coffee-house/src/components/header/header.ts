import BaseComponent from '../base-component';
import BurgerMenu from '../burger-menu/burger-menu';
import Logo from '../logo/logo';
import HeaderMenuLink from './header-menu-link/header-menu-link';
import HeaderNav from './header-nav/header-nav';
import './header.scss';

export default class Header extends BaseComponent<'header'> {
  constructor() {
    super('header', ['header']);

    this.node.append(this.createMarkup());
  }

  private createMarkup() {
    const container = new BaseComponent('div', ['container']).getNode();
    const wrapper = new BaseComponent('div', ['header__wrapper']).getNode();

    const headerLogo = new Logo().getNode();
    const headerNavigation = new HeaderNav().getNode();
    const headerMenuLink = HeaderMenuLink;
    const burgerMenu = new BurgerMenu().getNode();

    wrapper.append(headerLogo, headerNavigation, headerMenuLink, burgerMenu);
    container.append(wrapper);

    return container;
  }
}
