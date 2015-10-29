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

export default function(ctrl) {
  return m('div#container', [
    m('div.column', [
      m.component(board),
      m.component(bar, { type: 'health' }),
      m.component(bar, { type: 'energy' })
    ])
  ]);
};
