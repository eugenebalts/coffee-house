import { AppRoutesPath } from '../../../router/types';
import { INavigationItems } from '../../../types/types';

const navigationItems: INavigationItems[] = [
  {
    title: 'Favorite coffee',
    href: AppRoutesPath.FAVORITE,
  },
  {
    title: 'About',
    href: AppRoutesPath.ABOUT,
  },
  {
    title: 'Mobile app',
    href: AppRoutesPath.APPLICATION,
  },
  {
    title: 'Contact us',
    href: AppRoutesPath.CONTACT_US,
  },
];

export default navigationItems;
