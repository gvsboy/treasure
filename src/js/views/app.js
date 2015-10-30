import m from 'mithril';
import boardView from './board';
import boardController from '../controllers/board';
import barView from './bar';
import barController from '../controllers/bar';

// Board component.
var board = {
  view: boardView,
  controller: boardController
};

// Bar component.
var bar = {
  view: barView,
  controller: barController
};

// What floor are we on?
var floor = 1;

export default function(ctrl) {
  return m('div#container', [
    m('div.column', [
      m.component(board, { floor }),
      m.component(bar, { type: 'health' }),
      m.component(bar, { type: 'energy' })
    ])
  ]);
};
