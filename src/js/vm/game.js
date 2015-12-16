import m from 'mithril';

import Player from '../models/characters/player';
import BoardVM from '../vm/board';

function Game() {
  this.start();
}

Game.prototype = {

  start: function(floor = 1) {
    this.player = m.prop(new Player());
    this.boardVM = m.prop(new BoardVM(floor));
  }

};

export default Game;
