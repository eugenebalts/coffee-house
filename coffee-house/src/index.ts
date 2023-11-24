import Header from './components/header/header';
import '../src/styles/index.scss';

class App {
  public start() {
    console.log('Application has been started');

    const header = new Header().getNode();
    const main = document.createElement('main');

    document.body.append(header, main);
  }
}

new App().start();
