import BaseComponent from '../../../components/base-component';
import MenuItemCard from '../../../components/menu-item/menu-item';
import MENU from '../../../constants/menu';
import './section-menu.scss';

export default class SectionMenu extends BaseComponent<'section'> {
  private activeCategory: string = '';

  constructor() {
    super('section', ['section_menu', 'main__section']);

    this.node.append(this.createMarkup());
  }

  private createMarkup() {
    const wrapper = new BaseComponent('div', ['section__wrapper']).getNode();

    const title = new BaseComponent('h1', [
      'section__title',
      'section_menu__title',
      'section__title-h2',
    ]).getNode();
    title.innerHTML = `Behind each of our cups <br>hides an <i>amazing surprise</i>`;

    const content = this.createSectionContent();

    wrapper.append(title, content);

    return wrapper;
  }

  private createSectionContent() {
    const content = new BaseComponent('div', [
      'section_menu__content',
    ]).getNode();

    const pageNavigation = this.createPageNavigation();
    const menu = this.createMenu();

    content.append(pageNavigation, menu);

    return content;
  }

  private createPageNavigation() {
    const pageNavigation = new BaseComponent('ul', [
      'section_menu__nav',
    ]).getNode();

    for (const { category } of MENU) {
      const navigationItem = new BaseComponent('li', [
        'section_menu__nav-item',
        'link',
        'link--button',
      ]).getNode();

      if (!this.activeCategory) {
        this.activeCategory = category;
        navigationItem.classList.add('section_menu__nav-item_active');
      }

      const itemIcon = new BaseComponent('div', [
        'section_menu__nav-item__icon',
        `section_menu__nav-item__icon-${category}`,
        'link--button__icon',
      ]).getNode();

      const itemTitle = new BaseComponent(
        'p',
        [
          'section_menu__nav-item__title',
          `section_menu__nav-item__title_${category}`,
        ],
        category
      ).getNode();

      navigationItem.append(itemIcon, itemTitle);

      pageNavigation.append(navigationItem);
    }

    return pageNavigation;
  }

  private createMenu() {
    const menuWrapper = new BaseComponent('div', [
      'section_menu__menu-wrapper',
    ]).getNode();

    MENU.forEach(({ category, menuItems }, i) => {
      const menu = new BaseComponent('div', [
        'section_menu__menu',
        `section_menu__menu_${category}`,
      ]).getNode();

      menu.setAttribute('category', category);

      for (const { name, description, price, pathToImg } of menuItems) {
        const card = new MenuItemCard(
          name,
          description,
          price,
          pathToImg
        ).getNode();

        card.classList.add('section_menu__menu-item', 'menu-item_card');

        menu.append(card);
      }

      menuWrapper.append(menu);
    });

    return menuWrapper;
  }

  private switchMenu() {}
}
