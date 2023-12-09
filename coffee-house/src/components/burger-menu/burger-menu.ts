import BaseComponent from '../base-component';
import './burger-menu.scss';

class BurgerMenu extends BaseComponent<'div'> {
  constructor() {
    super('div', ['burger-menu', 'link--button', 'link--button_dark']);

    this.createMarkup();
    this.setEventListeners();
  }

  private createMarkup() {
    this.node.innerHTML = `<span></span><span></span>`;
  }

  private setEventListeners() {
    const classForBody = 'burger--open';
    const classForBurger = 'burger-menu_open';

    this.node.addEventListener('click', () => {
      if (!this.node.classList.contains(classForBurger)) {
        document.body.classList.add(classForBody);
        this.node.classList.add(classForBurger);
      } else {
        document.body.classList.remove(classForBody);
        this.node.classList.remove(classForBurger);
      }

      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        document.body.classList.remove(classForBody);
        this.node.classList.remove(classForBurger);
      }
    });
  }
}

export default new BurgerMenu().getNode();
