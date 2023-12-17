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
  private autoSwipe: NodeJS.Timeout = this.interval();
  private indicatorAnimation: NodeJS.Timeout = this.animateIndicator();
  private readonly animationDuration: number = 5000;
  private currentAnimationTime: number = 0;

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

    this.setAutoSwipe();
    this.refreshIndicator();
  }

  private interval() {
    return setInterval(() => {
      setTimeout;
      this.navigateRight();
    }, this.animationDuration - this.currentAnimationTime);
  }

  private animateIndicator() {
    const activeIndicator = this.indicatorList?.childNodes[this.activeSlide];
    let initialWidth =
      (this.currentAnimationTime / this.animationDuration) * 100;

    return setInterval(() => {
      if (activeIndicator instanceof HTMLElement) {
        this.currentAnimationTime += this.animationDuration / 50;

        initialWidth =
          (this.currentAnimationTime / this.animationDuration) * 100;

        if (activeIndicator.children[0] instanceof HTMLElement) {
          activeIndicator.children[0].style.width = `${initialWidth}%`;
        }
      }
    }, 100);
  }

  private stopAnimation() {
    clearInterval(this.autoSwipe);
    clearInterval(this.indicatorAnimation);
  }

  private continueAnimation() {
    this.setAutoSwipe();
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

      indicatorItem.innerHTML = `<div></div>`;

      if (i === this.activeSlide) {
        indicatorItem.classList.add('slider__indicator-item_active');
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

    this.setAutoSwipe();
    this.sliderSwiping();
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

    this.currentAnimationTime = 0;
    this.setAutoSwipe();
    this.refreshIndicator();
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

    this.currentAnimationTime = 0;
    this.setAutoSwipe();
    this.refreshIndicator();
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

  private refreshIndicator() {
    this.indicatorList.childNodes.forEach((indicator) => {
      if (
        indicator instanceof HTMLElement &&
        indicator.children[0] instanceof HTMLElement
      ) {
        indicator.children[0].style.width = '0%';
      }
    });
  }

  private setAutoSwipe() {
    clearInterval(this.autoSwipe);
    clearInterval(this.indicatorAnimation);

    this.autoSwipe = this.interval();
    this.indicatorAnimation = this.animateIndicator();
  }

  private sliderSwiping() {
    let startPosition = 0;
    let endPosition = 0;
    let isDown = false;

    this.sliderCardsList.addEventListener('touchstart', (event) => {
      handleTouchStart(event);
    });

    this.sliderCardsList.addEventListener('mousedown', (event) => {
      handleTouchStart(event);
    });

    this.sliderCardsList.addEventListener('touchmove', (event) => {
      handleTouchMove(event);
    });

    this.sliderCardsList.addEventListener('mousemove', (event) => {
      handleTouchMove(event);
    });

    this.sliderCardsList.addEventListener('touchend', () => {
      handleTouchEnd();
    });

    this.sliderCardsList.addEventListener('mouseup', () => {
      handleTouchEnd();
    });

    const handleTouchStart = (event: TouchEvent | MouseEvent) => {
      isDown = true;

      if (event instanceof TouchEvent) {
        startPosition = event.touches[0].clientX;
      } else {
        startPosition = event.clientX;
      }

      this.stopAnimation();
    };

    const handleTouchMove = (event: TouchEvent | MouseEvent) => {
      if (isDown) {
        if (event instanceof TouchEvent) {
          endPosition = event.touches[0].clientX;
        } else {
          endPosition = event.clientX;
        }
      }

      const currentPosition = () => {
        const currentPosition = Number(
          this.sliderCardsList.style.transform.split('-')[1]?.split('px')[0] ||
            0
        );
        return currentPosition;
      };

      this.sliderCardsList.style.transform = `translateX(-${
        this.activeSlide * this.sliderCardsListWidth +
        (startPosition - endPosition) / 3
      }px)`;
    };

    const handleTouchEnd = () => {
      isDown = false;

      if (endPosition === 0) {
        endPosition = startPosition;
      }

      if (startPosition < endPosition) {
        this.navigateLeft();
      } else if (startPosition > endPosition) {
        this.navigateRight();
      } else {
        this.continueAnimation();
      }

      startPosition = 0;
      endPosition = 0;
    };
  }
}
