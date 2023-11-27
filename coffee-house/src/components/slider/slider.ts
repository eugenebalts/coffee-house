import BaseComponent from '../base-component';
import MenuItemCard from '../menu-item/menu-item';
import './slider.scss';
import { IMenuItem } from '../../types/types';

export default class Slider extends BaseComponent<'div'> {
  navigationLeft: HTMLElement;
  navigationRight: HTMLElement;
  indicatorList: HTMLElement;
  activeSlide: number;
  slides: IMenuItem[];

  constructor(slides: IMenuItem[]) {
    super('div', ['slider']);

    this.activeSlide = 0;
    this.slides = slides;
    this.indicatorList = this.createIndicator();
    this.navigationLeft = this.createNavigationLeft();
    this.navigationRight = this.createNavigationRight();

    const sliderViewWrapper = this.createSliderViewWrapper();

    this.node.append(
      this.navigationLeft,
      sliderViewWrapper,
      this.navigationRight
    );
  }

  private createSliderViewWrapper() {
    const sliderViewWrapper = new BaseComponent('div', [
      'slider__view-wrapper',
    ]).getNode();

    const sliderCards = this.createSliderCards();
    const sliderIndicators = this.indicatorList;

    sliderViewWrapper.append(sliderCards, sliderIndicators);

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

      if (i === this.activeSlide)
        indicatorItem.classList.add('slider__indicator-item_active');
      indicatorList.append(indicatorItem);
    }

    return indicatorList;
  }
}
