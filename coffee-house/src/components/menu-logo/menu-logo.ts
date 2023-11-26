import BaseComponent from '../base-component';
import './menu-logo.scss';

export default class MenuLogo extends BaseComponent<'div'> {
  constructor() {
    super('div', ['menu-logo']);
  }
}
