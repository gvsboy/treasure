import m from 'mithril';

import gameView from './game';
import gameController from '../controllers/game';

// Board component.
var game = {
  view: gameView,
  controller: gameController
};

export default function(ctrl) {
  return m.component(game);
};
