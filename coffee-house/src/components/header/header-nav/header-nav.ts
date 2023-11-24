import BaseComponent from '../../base-component';
import navigationItems from './navigation-items';
import Link from '../../link/link';
import { INavigationItems } from '../../../types/types';
import './header-nav.scss';

export default class HeaderNav extends BaseComponent<'nav'> {
  constructor() {
    super('nav', ['header__nav']);

    this.node.append(this.createMarkup());
  }

  private createMarkup() {
    const navigationList = new BaseComponent('ul', [
      'header__nav-list',
    ]).getNode();

    for (const navItem of navigationItems) {
      const navigationItem = this.createNavItem(navItem, ['header__nav-item']);

      navigationList.append(navigationItem);
    }

    return navigationList;
  }

  private createNavItem(item: INavigationItems, classNames: string[]) {
    const navigationItem: HTMLLIElement = new BaseComponent('li', [
      ...classNames,
    ]).getNode();

    const itemLink: HTMLAnchorElement = new Link(
      item.title,
      ['header__link', 'link--inline'],
      item.href
    ).getNode();

    navigationItem.append(itemLink);

    return navigationItem;
  }
}
