import BaseComponent from '../base-component';
import MenuItemCard from '../menu-item/menu-item';
import './slider.scss';
import { IMenuItem } from '../../types/types';

export default class Slider extends BaseComponent<'div'> {
  private navigationLeft: HTMLElement;
  private navigationRight: HTMLElement;
  private indicatorList: HTMLElement;
  private activeSlide: number;
  private slides: IMenuItem[];
  private sliderCardsList: HTMLElement;
  private sliderCardsListWidth: number = window.innerWidth > 767 ? 480 : 348;

  constructor(slides: IMenuItem[]) {
    super('div', ['slider']);

    this.activeSlide = 0;
    this.slides = slides;
    this.indicatorList = this.createIndicator();
    this.navigationLeft = this.createNavigationLeft();
    this.navigationRight = this.createNavigationRight();

    this.sliderCardsList = this.createSliderCards();
    const sliderViewWrapper = this.createSliderViewWrapper();

    this.node.append(
      this.navigationLeft,
      sliderViewWrapper,
      this.navigationRight
    );

    this.setListeners();
  }

  private createSliderViewWrapper() {
    const sliderViewWrapper = new BaseComponent('div', [
      'slider__view-wrapper',
    ]).getNode();

    const sliderIndicators = this.indicatorList;

    sliderViewWrapper.append(this.sliderCardsList, sliderIndicators);

    return sliderViewWrapper;
  }

  private createSliderCards() {
    const sliderCardsList = new BaseComponent('div', [
      'slider__cards-list',
    ]).getNode();

    this.slides.forEach((drink) => {
      const { name, description, price, pathToImg } = drink;

      const card = new MenuItemCard(
        name,
        description,
        price,
        pathToImg
      ).getNode();

      sliderCardsList.append(card);
    });

    return sliderCardsList;
  }

  private createNavigationLeft() {
    const navigationLeft = new BaseComponent('div', [
      'slider__navigation',
      'slider__navigation-left',
    ]).getNode();

    return navigationLeft;
  }

  private createNavigationRight() {
    const navigationRight = new BaseComponent('div', [
      'slider__navigation',
      'slider__navigation-right',
    ]).getNode();

    return navigationRight;
  }

  private createIndicator() {
    const indicatorList = new BaseComponent('ul', [
      'slider__indicator-list',
    ]).getNode();

    for (let i = 0; i < this.slides.length; i++) {
      const indicatorItem = new BaseComponent('div', [
        'slider__indicator-item',
      ]).getNode();

      if (i === this.activeSlide) {
        indicatorItem.classList.add('slider__indicator-item_active');
      } else {
        indicatorItem.classList.remove('slider__indicator-item_active');
      }

      indicatorList.append(indicatorItem);
    }

    return indicatorList;
  }

  private setListeners() {
    this.navigationLeft.addEventListener('click', () => {
      this.navigateLeft();
    });

    this.navigationRight.addEventListener('click', () => {
      this.navigateRight();
    });

    window.addEventListener('resize', () => {
      this.refreshWidth();
    });
  }

  private navigateLeft() {
    if (this.activeSlide > 0) {
      this.activeSlide -= 1;
    } else {
      this.activeSlide = this.slides.length - 1;
    }

    this.sliderCardsList.style.transform = `translateX(-${
      this.activeSlide * this.sliderCardsListWidth
    }px)`;
  }

  private navigateRight() {
    if (this.activeSlide < this.slides.length - 1) {
      this.activeSlide += 1;
    } else {
      this.activeSlide = 0;
    }

    this.sliderCardsList.style.transform = `translateX(-${
      this.activeSlide * this.sliderCardsListWidth
    }px)`;
  }

  private refreshWidth() {
    const widthBreakPoint = 767;

    this.sliderCardsListWidth =
      window.innerWidth >= widthBreakPoint ? 480 : 348;

    if (this.sliderCardsList.style.transform) {
      this.sliderCardsList.style.transform = `translateX(-${
        this.activeSlide * this.sliderCardsListWidth
      }px)`;
    }
  }
}
