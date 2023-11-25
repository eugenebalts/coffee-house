import BaseComponent from '../base-component';
import Link from '../link/link';
import CONTACTS from './contacts';
import './footer.scss';
import SOCIAL_MEDIA_DATA from './social-medias/SOCIAL-MEDIA-DATA';

export default class Footer extends BaseComponent<'footer'> {
  constructor() {
    super('footer', ['footer']);

    this.node.append(this.createMarkup());
  }

  private createMarkup() {
    const container = new BaseComponent('div', ['container']).getNode();
    const wrapper = new BaseComponent('div', ['footer__wrapper']).getNode();

    const footerSocial = this.createFooterSocial();
    const footerContacts = this.createFooterContacts();

    wrapper.append(footerSocial, footerContacts);
    container.append(wrapper);

    return container;
  }

  private createFooterSocial() {
    const socialWrapper = new BaseComponent('div', [
      'footer__social-wrapper',
    ]).getNode();

    const socialTitle = new BaseComponent('h2', ['footer__title']).getNode();
    socialTitle.innerHTML = 'Sip, Savor, Smile.<br><i>It’s coffee time!</i>';

    const socialList = this.createSocialList();

    socialWrapper.append(socialTitle, socialList);

    return socialWrapper;
  }

  private createSocialList() {
    const socialList = new BaseComponent('ul', [
      'footer__social-list',
    ]).getNode();

    for (const socialMedia of SOCIAL_MEDIA_DATA) {
      const socialMediaLink = new Link(
        '',
        [
          'footer__social-link',
          `footer__social-link_${socialMedia.media}`,
          'link--button',
          'link--button_light',
        ],
        socialMedia.href
      ).getNode();

      socialList.append(socialMediaLink);
    }

    return socialList;
  }

  private createFooterContacts() {
    const contactsWrapper = new BaseComponent('div', [
      'footer__contacts-wrapper',
    ]).getNode();

    const contactsTitle = new BaseComponent(
      'h3',
      ['footer__subtitle'],
      'Contact us'
    ).getNode();

    const contactsList = new BaseComponent('ul', [
      'footer__contacts-list',
    ]).getNode();

    for (const contact of CONTACTS) {
      const contactItem = new BaseComponent('li', [
        'footer__contacts-item',
      ]).getNode();

      const contactItemLink = new Link(
        '',
        ['footer__link', 'link--inline', 'link--inline_light'],
        // `${contact.href}`
        ''
      ).getNode();

      const contactItemTitle = new BaseComponent(
        'p',
        [`footer__${contact.type}-title`],
        `${contact.title}`
      ).getNode();

      const contactItemIcon = new BaseComponent('div', [
        `footer__${contact.type}-icon`,
        'footer__contacts-icon',
      ]).getNode();

      contactItemLink.append(contactItemIcon, contactItemTitle);
      contactItem.append(contactItemLink);
      contactsList.append(contactItem);
    }
    contactsWrapper.append(contactsTitle, contactsList);

    return contactsWrapper;
  }
}