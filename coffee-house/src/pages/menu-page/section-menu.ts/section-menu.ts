// Я СДЕЛАЮ ТУТ ВСЕ ПО КРАСОТЕ, НО ПОТОМ :(

import BaseComponent from '../../../components/base-component';
import MenuItemCard from '../../../components/menu-item/menu-item';
import MENU from '../../../constants/menu';
import { IMenuItem, IProductAdditionally } from '../../../types/types';
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
  private modalCard: HTMLElement;
  private modalCardTotal: HTMLElement;
  private sizePrice = 0;
  private additivesPrice = 0;

  constructor() {
    super('section', ['section_menu', 'main__section']);

    this.modalCard = this.initialModalCard();
    this.modalCardTotal = this.initialModalCardTotal();
    this.menuWrapper = this.initialMenuWrapper();

    this.pageNavigation = this.createPageNavigation();

    this.refreshInnerWidth();
    this.node.append(this.createMarkup());
    this.node.append(this.modalCard);

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
        'section_menu__button',
        'link',
        'link--button',
      ]).getNode();

      navigationItem.setAttribute('category', String(i));

      if (i === 0) {
        this.activeCategory = i;
        navigationItem.classList.add('section_menu__button_active');
      }

      const itemIcon = new BaseComponent('div', [
        'section_menu__button__icon',
        `section_menu__button__icon-${category}`,
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

  private initialModalCard() {
    return new BaseComponent('div', ['modal-card']).getNode();
  }

  private initialModalCardTotal() {
    return new BaseComponent(
      'div',
      ['modal-card__total__price'],
      `$${0}`
    ).getNode();
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

    this.menuWrapper.addEventListener('click', (event) => {
      let menuItem: HTMLElement | null = null;

      if (event.target instanceof HTMLElement) {
        if (event.target.classList.contains('menu-item')) {
          menuItem = event.target;
        } else if (event.target.closest('.menu-item')) {
          menuItem = event.target.closest('.menu-item');
        }

        if (menuItem) {
          this.createModalCard(
            menuItem,
            MENU[this.activeCategory].additionally
          );
        }
      }
    });

    this.modalCard.addEventListener('click', (event) => {
      this.closeModalCard(event);
    });
  }

  private closeModalCard(event: MouseEvent) {
    event.stopPropagation();

    if (event.target instanceof HTMLElement) {
      if (
        event.target === this.modalCard ||
        event.target.classList.contains('modal-card__close-btn')
      ) {
        this.modalCard.classList.remove('modal-card--showed');
        document.body.classList.remove('modal--open');
      }
    }
  }

  private createModalCard(
    menuItem: HTMLElement,
    additionally: IProductAdditionally
  ) {
    document.body.classList.add('modal--open');

    const initialPrice = Number(
      menuItem.getElementsByTagName('p')[1].textContent?.slice(1) || 0
    );

    this.modalCard.innerHTML = '';

    const wrapper = new BaseComponent('div', ['modal-card__wrapper']).getNode();

    // IMAGE
    const image = new BaseComponent('div', ['modal-card__image']).getNode();

    image.append(menuItem.children[0].children[0].cloneNode(true));

    // CONTENT

    const content = new BaseComponent('div', ['modal-card__content']).getNode();

    const contentTextContent = new BaseComponent('div', [
      'modal-card__text-content',
    ]).getNode();

    const title = menuItem.getElementsByTagName('h3')[0].cloneNode(true);
    const description = menuItem.getElementsByTagName('p')[0].cloneNode(true);

    contentTextContent.append(title, description);

    // Additionally

    const additionallyWrapper = new BaseComponent('div', [
      'modal-card__additionally',
    ]).getNode();

    // Size

    const sizeWrapper = new BaseComponent('div', [
      'modal-card__additionally__size',
    ]).getNode();

    const sizeTitle = new BaseComponent('p', [], 'Size').getNode();

    const sizeButtons = new BaseComponent('ul', [
      'modal-card__additionally__buttons',
    ]).getNode();

    const { size } = additionally;

    size.forEach((productSize, i) => {
      const sizeButton = new BaseComponent('li', [
        'section_menu__button',
        'link',
        'link--button',
        'link--button_dark',
      ]).getNode();

      sizeButton.setAttribute('value', `${productSize.name}`);
      sizeButton.setAttribute('type', `size`);

      if (i === 0) sizeButton.classList.add('section_menu__button_active');

      const buttonIcon = new BaseComponent(
        'div',
        [
          'section_menu__button__icon',
          'link--button__icon',
          'modal-card__button__icon',
        ],
        `${productSize.name}`
      ).getNode();

      const buttonTitle = new BaseComponent(
        'p',
        ['section_menu__button__title'],
        `${productSize.volume}`
      ).getNode();

      sizeButton.append(buttonIcon, buttonTitle);

      sizeButtons.append(sizeButton);
    });

    sizeWrapper.append(sizeTitle, sizeButtons);

    sizeWrapper.addEventListener('click', (event) => {
      if (event.target instanceof HTMLElement) {
        let button: HTMLElement | null = null;

        if (event.target.classList.contains('link--button')) {
          button = event.target;
        } else if (event.target.closest('.link--button')) {
          button = event.target.closest('.link--button');
        }

        if (button) {
          const sizeButtons = Array.from(
            sizeWrapper.getElementsByTagName('li')
          );

          sizeButtons.forEach((button) => {
            button.classList.remove('section_menu__button_active');
          });

          this.handleAdditionally(button, additionally, initialPrice);
        }
      }
    });

    // Additives

    const additivesWrapper = new BaseComponent('div', [
      'modal-card__additionally__additives',
    ]).getNode();

    additivesWrapper.addEventListener('click', (event) => {
      if (event.target instanceof HTMLElement) {
        let button: HTMLElement | null = null;

        if (event.target.classList.contains('link--button')) {
          button = event.target;
        } else if (event.target.closest('.link--button')) {
          button = event.target.closest('.link--button');
        }

        if (button) {
          this.handleAdditionally(button, additionally, initialPrice);
        }
      }
    });

    const additivesTitle = new BaseComponent('p', [], 'Additives').getNode();

    const additivesButtons = new BaseComponent('ul', [
      'modal-card__additionally__buttons',
    ]).getNode();

    const { additives } = additionally;

    additives.forEach((additives, i) => {
      const additivesButton = new BaseComponent('li', [
        'section_menu__button',
        'link',
        'link--button',
        'link--button_dark',
      ]).getNode();

      additivesButton.setAttribute('value', `${additives.name}`);
      additivesButton.setAttribute('type', `additives`);

      const buttonIcon = new BaseComponent(
        'div',
        [
          'section_menu__button__icon',
          'link--button__icon',
          'modal-card__button__icon',
        ],
        `${i + 1}`
      ).getNode();

      const buttonTitle = new BaseComponent(
        'p',
        ['section_menu__button__title'],
        `${additives.name}`
      ).getNode();

      additivesButton.append(buttonIcon, buttonTitle);

      additivesButtons.append(additivesButton);
    });

    additivesWrapper.append(additivesTitle, additivesButtons);

    additionallyWrapper.append(sizeWrapper, additivesWrapper);

    // TOTAL

    const totalWrapper = new BaseComponent('div', [
      'modal-card__total',
    ]).getNode();

    const totalTitle = new BaseComponent(
      'h3',
      ['modal-card__total__title'],
      'Total:'
    ).getNode();

    this.modalCardTotal.innerHTML = `$${initialPrice.toFixed(2)}`;

    totalWrapper.append(totalTitle, this.modalCardTotal);

    // DISCLAIMER

    const disclaimer = new BaseComponent('div', [
      'modal-card__disclaimer',
    ]).getNode();

    const disclaimerIcon = new BaseComponent('div', [
      'modal-card__disclaimer__icon',
    ]).getNode();

    const disclaimerText = new BaseComponent(
      'p',
      ['modal-card__disclaimer__text-content'],
      `The cost is not final. Download our mobile app to see the final
      price and place your order. Earn loyalty points and enjoy your
      favorite coffee with up to 20% discount.`
    ).getNode();

    disclaimer.append(disclaimerIcon, disclaimerText);

    //CLOSE BTN

    const closeBtn = new BaseComponent(
      'button',
      ['link', 'link--button', 'link--button_dark', 'modal-card__close-btn'],
      'Close'
    ).getNode();

    content.append(
      contentTextContent,
      additionallyWrapper,
      totalWrapper,
      disclaimer,
      closeBtn
    );

    wrapper.append(image, content);

    this.modalCard.append(wrapper);

    this.modalCard.classList.add('modal-card--showed');
  }

  private handleAdditionally(
    button: HTMLElement,
    additionally: IProductAdditionally,
    initialPrice: number
  ) {
    const type = button.getAttribute('type');
    const value = button.getAttribute('value');
    const buttonActiveClass = 'section_menu__button_active';
    const currentPrice = Number(this.modalCardTotal.innerHTML.slice(1));

    if (type && value) {
      if (type === 'size' || type === 'additives') {
        const additionallyItems = additionally[type];

        additionallyItems.forEach((item) => {
          if (item.name.toUpperCase() === value.toUpperCase()) {
            let finalPrice = 0;

            if (type === 'size') {
              finalPrice = initialPrice + item.price + this.additivesPrice;

              this.sizePrice = item.price;

              button.classList.add(buttonActiveClass);
            } else {
              if (button.classList.contains(buttonActiveClass)) {
                this.additivesPrice -= item.price;

                finalPrice =
                  initialPrice + this.sizePrice + this.additivesPrice;

                button.classList.remove(buttonActiveClass);
              } else {
                this.additivesPrice += item.price;

                finalPrice =
                  initialPrice + this.sizePrice + this.additivesPrice;

                button.classList.add(buttonActiveClass);
              }
            }

            this.modalCardTotal.innerHTML = `$${finalPrice.toFixed(2)}`;
          }
        });
      }
    }
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
        const activeClass = 'section_menu__button_active';

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
