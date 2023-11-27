import HomePage from '../pages/home-page/home-page';
import MenuPage from '../pages/menu-page/menu-page';
import { AppRoute, AppRoutesPath } from './types';

export const HOME_ROUTE: AppRoute = {
  path: AppRoutesPath.HOME,
  component: () => HomePage,
};

export const MENU_ROUTE: AppRoute = {
  path: AppRoutesPath.MENU,
  component: () => MenuPage,
};

export const NOT_FOUND_ROUTE: AppRoute = {
  path: AppRoutesPath.NOT_FOUND,
  component: () => HomePage,
};

export const ROUTES: AppRoute[] = [HOME_ROUTE, MENU_ROUTE, NOT_FOUND_ROUTE];
