import m from 'mithril';
import boardController from './controllers/board';
import boardView from './views/board';

var board = {
  controller: boardController,
  view: boardView
};

m.mount(document.getElementById('app'), board);
