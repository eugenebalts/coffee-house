import getHref from '../../page-href';
import BaseComponent from '../base-component';
import './link.scss';

export default class Link extends BaseComponent<'a'> {
  private readonly pageHref: string = getHref();
  constructor(text: string, classNames: string[] = [], href: string) {
    super('a', ['link', ...classNames], text);
    this.node.href = href;

    this.node.addEventListener('click', (e) => {
      e.preventDefault();

      if (href.startsWith('/#')) {
        this.handleAnchorLink(href);
      } else if (href.startsWith('http')) {
        this.handleHttpLink(href);
      } else if (href.startsWith('tel:')) {
        this.handlePhoneCallLink(href);
      } else {
        this.changeUrlEvent(href);
      }
    });
  }

  private changeUrlEvent(href: string): void {
    let hash = `#${href.slice(1)}`;

    if (hash.length == 1) hash = '';

    window.history.pushState({}, '', this.pageHref + hash);
    const changeURL = new CustomEvent('changeURL', { bubbles: true });
    window.dispatchEvent(changeURL);
  }

  private handleAnchorLink(href: string): void {
    window.history.pushState({}, '', this.pageHref);
    const changeURL = new CustomEvent('changeURL', { bubbles: true });
    window.dispatchEvent(changeURL);

    const hash = href.split('/')[1];
    const navigateToElement = document.body.querySelector(`${hash}`);

    if (navigateToElement) {
      navigateToElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  private handleHttpLink(href: string): void {
    window.open(href, '_blank');
  }

  private handlePhoneCallLink(href: string) {
    window.location.href = href;
  }
}
