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
    const pathname: string[] = location.pathname.split('/').slice(1);

    const matchedRoute: AppRoute | undefined = this.routes.find((route) => {
      const routePathSegments: string[] = route.path.split('/').slice(1);

      if (routePathSegments.length !== pathname.length) {
        return false;
      }

      const match: boolean = routePathSegments.every(
        (routePathSegment: string, i: number): boolean => {
          return (
            routePathSegment === pathname[i] || routePathSegment[0] === ':'
          );
        }
      );

      return match;
    });

    if (!matchedRoute) {
      this.onHashChange(NOT_FOUND_ROUTE);
    } else {
      this.onHashChange(matchedRoute);
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
