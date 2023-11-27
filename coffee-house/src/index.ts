import Header from './components/header/header';
import '../src/styles/index.scss';
import Footer from './components/footer/footer';
import router, { createRouter } from './router/router';
import HomePage from './pages/home-page/home-page';
import Router from './router/router';

class App {
  constructor() {}
  public start() {
    console.log('Application has been started');

    const header = new Header().getNode();
    const main = document.createElement('main');
    const footer = new Footer().getNode();

    document.body.append(header, main, footer);

    createRouter(main);
  }
}

new App().start();
