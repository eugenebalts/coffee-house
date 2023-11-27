import { AppRoutesPath } from '../../router/types';
import BaseComponent from '../base-component';
import Link from '../link/link';
import './logo.scss';

export default class Logo extends BaseComponent<'div'> {
  constructor() {
    super('div', ['logo']);

    this.node.append(this.createMarkup());
  }

  private createMarkup() {
    const logoLink = new Link('', ['logo__link'], AppRoutesPath.HOME).getNode();

    return logoLink;
  }
}
