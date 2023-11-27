import headerMenuLink from '../components/header/header-menu-link/header-menu-link';
import getHref from '../page-href';
import { NOT_FOUND_ROUTE, ROUTES } from './routes';
import { AppRoute } from './types';

export default class Router {
  constructor(
    private readonly routes: AppRoute[],
    private onHashChange: (route: AppRoute) => void
  ) {
    window.addEventListener('hashchange', this.onHashChangeHandler.bind(this));
    window.addEventListener(
      'changeURL',
      this.onHashChangeHandler.bind(this) as EventListener
    );
    window.addEventListener('popstate', this.onHashChangeHandler.bind(this));
    this.onHashChangeHandler();
  }

  private onHashChangeHandler() {
    const hash = window.location.hash.split('/');
    const pathname = [hash[0].slice(1), ...hash.slice(1)];

    const matchedRoute: AppRoute | undefined = this.routes.find((route) => {
      const routePathSegments: string[] = route.path.split('/').slice(1);

      if (routePathSegments.length !== pathname.length) {
        return false;
      }

      const match: boolean = routePathSegments.every(
        (routePathSegment: string, i: number): boolean => {
          if (routePathSegment === 'menu') {
            this.setActivePage(true);
          } else {
            this.setActivePage(false);
          }

          return (
            routePathSegment === pathname[i] || routePathSegment[0] === ':'
          );
        }
      );

      return match;
    });

    if (!matchedRoute) {
      this.onHashChange(NOT_FOUND_ROUTE);
      window.history.pushState({}, '', getHref());
      const changeURL = new CustomEvent('changeURL', { bubbles: true });
      window.dispatchEvent(changeURL);
    } else {
      this.onHashChange(matchedRoute);
    }
  }

  private setActivePage(inPath: boolean) {
    const isActive = headerMenuLink.classList.contains(
      'header__menu-link_active'
    );

    if (!inPath && isActive) {
      headerMenuLink.classList.remove('header__menu-link_active');
    } else if (inPath && !isActive) {
      headerMenuLink.classList.add('header__menu-link_active');
    }
  }
}

export const createRouter = (appendIn: HTMLElement) => {
  return new Router(ROUTES, (route: AppRoute) => {
    if (route) {
      appendIn.innerHTML = '';
      appendIn.append(route.component());

      document.body?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
};
