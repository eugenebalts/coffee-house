import BaseComponent from '../base-component';
import './drink-card.scss';

export default class DrinkCard extends BaseComponent<'div'> {
  name: string;
  description: string;
  price: number;
  pathToImg: string;

  constructor(
    name: string,
    description: string,
    price: number,
    pathToImg: string
  ) {
    super('div', ['drink-card']);

    this.name = name;
    this.description = description;
    this.price = price;
    this.pathToImg = pathToImg;

    this.node.append(this.createMarkup());
  }

  private createMarkup() {
    const wrapper = new BaseComponent('div', ['drink-card__wrapper']).getNode();

    const image = new BaseComponent('div', [
      'drink-card__image',
      `drink-card__image-${this.pathToImg}`,
    ]).getNode();

    const title = new BaseComponent(
      'h3',
      ['drink-card__title'],
      this.name
    ).getNode();

    const description = new BaseComponent(
      'p',
      ['drink-card__description'],
      this.description
    ).getNode();

    const price = new BaseComponent(
      'p',
      ['drink-card__price'],
      `$${this.price}`
    ).getNode();

    wrapper.append(image, title, description, price);

    return wrapper;
  }
}
