import { AppRoutesPath } from '../../../router/types';
import { INavigationItems } from '../../../types/types';

const navigationItems: INavigationItems[] = [
  {
    title: 'Favorite Coffee',
    href: AppRoutesPath.FAVORITE,
  },
  {
    title: 'About',
    href: AppRoutesPath.ABOUT,
  },
  {
    title: 'Mobile App',
    href: AppRoutesPath.APPLICATION,
  },
  {
    title: 'Contact Us',
    href: AppRoutesPath.CONTACT_US,
  },
];

export default navigationItems;
