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

console.log(`
Самостоятельная оценка:\n
- Валидация +18\n
- Планировка +40\n
- Требования стилей +10\n
- Интерактивность +32 \n

ИТОГО: 100 баллов. \n

PS* Есть малюсенькие отклонения, но они точно меньше 10px. 
Интерактивность местами у меня своя, что не запрещено по ТЗ. В макете был
исключительно пример итерактивности!

ВАЖНО!!!

Так как гитхаб имеет свои настройки сервера,
он ищет фактические URL пути. Поэтому переход на
другую страницу реализовывается через #. 

Как делать НЕ надо: ...coffe-house/dist/menu
Как делать надо: ...coffe-house/dist/#menu - ставим хеш #

При введении неверного адреса, страница вернется на home-page.
В будущем планирую сделать страницу 404.

Итог: SPA приложение, написанное полностью на TypeScript,
пока не оживленное, но все к этому подготовлено. Справился за 3 дня! :))

`);
