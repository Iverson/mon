# Dashboard UI

Single Page Application с дашбордами для мониторинга.

### Development

Для локальной разработки в системе должны быть установлены:
* [Node.js](https://nodejs.org)
* [Yarn](https://yarnpkg.com)

В приложении используется стек: [TypeScript](http://www.typescriptlang.org/), [Angular](https://angular.io/), [Angular CLI](https://github.com/angular/angular-cli) и [D3.js](https://d3js.org/).

**Установка зависимостей**
```
yarn
```

**Запуск dev-сервера в watch-режиме**
```
npm start
```
приложение запустится по адресу [localhost:4200](http://localhost:4200/) с автоматическим отслеживанием изменений файлов исходного кода, компиляцией и live-reloading.

**Сборка для production**

```
npm run build
```

**Запуск production-сборки локально**
```
npm run build:serve
```
приложение запустится по адресу [localhost:4200](http://localhost:4200/)

### Deployment

Результатом сборки будет набор JS, CSS и HTML файлов в папке `dist/` которые нужно будет просто скопировать на сервер как есть в какую-нибудь папку из которой nginx будет раздавать их как статику. 
По умолчанию предполгается что SPA будет лежать в корне домена или поддомена, например по адресу `dashboard.monitoring.binomo.io/` будет отдаваться `index.html`
Если же нужно чтобы адрес приложения содержал base path, например `monitoring.binomo.io/dashboard/` то в команду сборки нужно передать соответствующую опцию, для корректной работы внутреннего роутинга SPA:
```
npm run build -- --base-href '/dashboard/'
```

### Работа с графиками

Графики самописные на D3, оформлены в виде Angular-компонентов.
Всего 2 типа графиков - line и bar. Все что нужно это передать в компонент графика датасет правильного формата, примеры можно найти в файлах `data.mock.ts`. Если датасет будет изменен, график автоматически перестроится.
