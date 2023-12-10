import BaseComponent from '../../../components/base-component';
import MenuItemCard from '../../../components/menu-item/menu-item';
import MENU from '../../../constants/menu';
import { IMenuItem } from '../../../types/types';
import './section-menu.scss';

export default class SectionMenu extends BaseComponent<'section'> {
  private innerWidth: number = window.innerWidth;
  private activeCategory: number = 0;
  private cardsInMenu: number = 0;
  private INITIAL_CARDS_SHOWED: number = this.innerWidth <= 768 ? 4 : 8;
  private cardsShowed: number = 0;
  private menuWrapper: HTMLElement;
  private loadMoreBtn: HTMLElement = this.createLoadMoreBtn();
  private pageNavigation: HTMLElement;

  constructor() {
    super('section', ['section_menu', 'main__section']);

    this.menuWrapper = this.initialMenuWrapper();

    this.pageNavigation = this.createPageNavigation();

    this.refreshInnerWidth();
    this.node.append(this.createMarkup());

    this.setListeners();
  }

  private refreshInnerWidth() {
    window.addEventListener('resize', () => {
      this.innerWidth = window.innerWidth;

      if (this.innerWidth <= 768) {
        this.INITIAL_CARDS_SHOWED = 4;
      } else {
        this.INITIAL_CARDS_SHOWED = 8;

        this.menuWrapper.children[1]?.remove();
      }

      this.menuWrapper.children[0]?.remove();
      this.createMenu(this.INITIAL_CARDS_SHOWED);
    });
  }

  private createMarkup() {
    const wrapper = new BaseComponent('div', [
      'section__wrapper',
      'section_menu__wrapper',
    ]).getNode();

    const title = new BaseComponent('h1', [
      'section__title',
      'section_menu__title',
      'section__title-h2',
    ]).getNode();

    title.innerHTML = `Behind each of our cups hides an <span>amazing surprise</span>`;

    const content = this.createSectionContent();

    wrapper.append(title, content);

    return wrapper;
  }

  private createSectionContent() {
    const content = new BaseComponent('div', [
      'section_menu__content',
    ]).getNode();

    this.createMenu(this.INITIAL_CARDS_SHOWED);

    content.append(this.pageNavigation, this.menuWrapper);

    return content;
  }

  private createPageNavigation() {
    const pageNavigation = new BaseComponent('ul', [
      'section_menu__nav',
    ]).getNode();

    for (let i = 0; i < MENU.length; i++) {
      const { category } = MENU[i];
      const navigationItem = new BaseComponent('li', [
        'section_menu__nav-item',
        'link',
        'link--button',
      ]).getNode();

      navigationItem.setAttribute('category', String(i));

      if (i === 0) {
        this.activeCategory = i;
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

  private createMenu(cardsQuantity: number) {
    if (MENU[this.activeCategory]) {
      const { menuItems, category } = MENU[this.activeCategory];

      this.cardsInMenu = menuItems.length;

      const menu = new BaseComponent('div', [
        'section_menu__menu',
        `section_menu__menu_${category}`,
      ]).getNode();

      menu.setAttribute('category', category);

      for (let i = 0; i < cardsQuantity; i++) {
        if (menuItems[i]) {
          const card = this.createCard(menuItems[i]);

          menu.append(card);
        } else {
          break;
        }
      }

      this.cardsShowed =
        cardsQuantity < menuItems.length ? cardsQuantity : menuItems.length;

      this.menuWrapper.append(menu);
    }

    if (this.cardsShowed < this.cardsInMenu) {
      this.menuWrapper.append(this.loadMoreBtn);
    }
  }

  private initialMenuWrapper() {
    return new BaseComponent('div', ['section_menu__menu-wrapper']).getNode();
  }

  private createLoadMoreBtn() {
    const loadMoreBtn = new BaseComponent('button', [
      'link--button',
      'link--button_dark',
      'section_menu__load-more-btn',
    ]).getNode();

    loadMoreBtn.addEventListener('click', () => {
      if (this.cardsShowed < this.cardsInMenu) {
        const cardsToShow =
          this.cardsShowed + (this.cardsInMenu - this.cardsShowed);

        const { menuItems, category } = MENU[this.activeCategory];

        for (let i = this.cardsShowed; i < cardsToShow; i++) {
          const card = this.createCard(menuItems[i]);

          this.menuWrapper.children[0].append(card);
        }

        this.cardsShowed =
          cardsToShow < menuItems.length ? cardsToShow : menuItems.length;

        if (this.cardsShowed === this.cardsInMenu) {
          this.menuWrapper.children[1]?.remove();
        }
      }
    });

    return loadMoreBtn;
  }

  private setListeners() {
    this.pageNavigation.addEventListener('click', (event) => {
      this.switchMenu(event);
    });
  }

  private switchMenu(event: MouseEvent) {
    if (event.target instanceof HTMLElement) {
      const targetTagName = event.target.tagName;
      let navigationItem: HTMLElement | null = null;

      switch (targetTagName) {
        case 'LI':
          navigationItem = event.target;

          break;
        case 'P':
          navigationItem = event.target.closest('li');

          break;
        case 'DIV':
          navigationItem = event.target.closest('li');

          break;
      }

      if (navigationItem) {
        this.activeCategory = Number(navigationItem.getAttribute('category'));
        const activeClass = 'section_menu__nav-item_active';

        this.pageNavigation.childNodes.forEach((navItem, i) => {
          if (navItem instanceof HTMLElement) {
            if (i !== this.activeCategory) {
              navItem.classList.remove(activeClass);
            } else {
              navItem.classList.add(activeClass);
            }
          }
        });

        this.menuWrapper.innerHTML = '';
        this.createMenu(this.INITIAL_CARDS_SHOWED);
      }
    }
    // this.cardsShowed = 0;
    // this.cardsInMenu = 0;
    // this.activeCategory = category;
  }

  private createCard(menuItem: IMenuItem) {
    const { name, description, price, pathToImg } = menuItem;

    const card = new MenuItemCard(
      name,
      description,
      price,
      pathToImg
    ).getNode();

    card.classList.add('section_menu__menu-item', 'menu-item_card');

    return card;
  }
}
