import BaseComponent from '../../../components/base-component';
import './section-about.scss';

export default class SectionAbout extends BaseComponent<'section'> {
  constructor() {
    super('section', ['main__section', 'section_about']);

    this.node.append(this.createMarkup());
    this.node.id = 'section_about';
  }

  private createMarkup() {
    const wrapper = new BaseComponent('div', [
      'section__wrapper',
      'section_about__wrapper',
    ]).getNode();

    const title = new BaseComponent('h2', [
      'section__title',
      'section__title_dark',
      'section__title-h2',
    ]).getNode();
    title.innerHTML = `Resource is <span>the perfect and cozy place</span>
      where you can enjoy a variety of hot beverages, relax, catch up
      with friends, or get some work done.`;

    const gallery = this.createGallery();

    wrapper.append(title, gallery);

    return wrapper;
  }

  private createGallery() {
    const gallery = new BaseComponent('div', [
      'section_about__gallery',
    ]).getNode();

    for (let i = 0; i < 4; i++) {
      const galleryItem = new BaseComponent('div', [
        'section_about__gallery-item',
        `section_about__gallery-item_${i + 1}`,
      ]).getNode();

      gallery.append(galleryItem);
    }

    return gallery;
  }
}
