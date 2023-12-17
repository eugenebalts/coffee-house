import Header from './components/header/header';
import '../src/styles/index.scss';
import Footer from './components/footer/footer';
import { createRouter } from './router/router';

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

console.log(
  'Не получилось сделать видео, так как видимо плохо настроил вебпак, никак не могу его добавить. Также не исключаю, что где-то мог накосячить, так как делал это в максимально сжатые сроки.'
);
