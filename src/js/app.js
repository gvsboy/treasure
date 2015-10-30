import m from 'mithril';
import appView from './views/app';
import appController from './controllers/app';

// App root component.
var app = {
  view: appView,
  controller: appController
};

m.mount(document.getElementById('app'), app);
