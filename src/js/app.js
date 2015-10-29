import m from 'mithril';
import appView from './views/app';

// App root component.
var app = {
  view: appView
};

m.mount(document.getElementById('app'), app);
