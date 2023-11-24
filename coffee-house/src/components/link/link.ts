import BaseComponent from '../base-component';
import './link.scss';

export default class Link extends BaseComponent<'a'> {
  constructor(text: string, classNames: string[] = [], href: string) {
    super('a', ['link', ...classNames], text);
    this.node.href = href;

    this.node.addEventListener('click', (e) => {
      e.preventDefault();
      this.changeUrlEvent(href);
    });
  }

  private changeUrlEvent(href: string): void {
    window.history.pushState({}, '', href);
    const changeURL = new CustomEvent('changeURL', { bubbles: true });
    window.dispatchEvent(changeURL);
  }
}
