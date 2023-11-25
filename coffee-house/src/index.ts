import Header from './components/header/header';
import '../src/styles/index.scss';
import Footer from './components/footer/footer';

class App {
  public start() {
    console.log('Application has been started');

    const header = new Header().getNode();
    const main = document.createElement('main');
    const footer = new Footer().getNode();

    document.body.append(header, main, footer);
  }
}

new App().start();
