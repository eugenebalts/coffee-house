export interface AppRoute {
  path: AppRoutesPath;
  component: () => HTMLElement;
}

export enum AppRoutesPath {
  HOME = '/',
  MENU = '/menu',
  NOT_FOUND = '/404',
  FAVORITE = '/#section_favorite',
  ABOUT = '/#section_about',
  APPLICATION = '/#section_app',
  CONTACT_US = '/#footer',
}
