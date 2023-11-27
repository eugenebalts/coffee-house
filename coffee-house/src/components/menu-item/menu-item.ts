import BaseComponent from '../base-component';
import './menu-item.scss';

export default class MenuItemCard extends BaseComponent<'div'> {
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
    super('div', ['menu-item']);

    this.name = name;
    this.description = description;
    this.price = price;
    this.pathToImg = pathToImg;

    this.node.append(this.createMarkup());
  }

  private createMarkup() {
    const wrapper = new BaseComponent('div', ['menu-item__wrapper']).getNode();

    const image = new BaseComponent('div', [
      'menu-item__image',
      `menu-item__image-${this.pathToImg}`,
    ]).getNode();

    const content = new BaseComponent('div', ['menu-item__content']).getNode();

    const title = new BaseComponent(
      'h3',
      ['menu-item__title'],
      this.name
    ).getNode();

    const description = new BaseComponent(
      'p',
      ['menu-item__description'],
      this.description
    ).getNode();

    const price = new BaseComponent(
      'p',
      ['menu-item__price'],
      `$${this.price.toFixed(2)}`
    ).getNode();

    content.append(title, description, price);

    wrapper.append(image, content);

    return wrapper;
  }
}
