import m from 'mithril';

import Player from '../models/characters/player';
import Card from '../models/card';
import BoardVM from '../vm/board';

function Game() {
  this.start();
}

Game.prototype = {

  start: function(floor = 1) {
    console.log('start!');
    this.player = m.prop(new Player());
    this.boardVM = m.prop(new BoardVM());
    this.cards = m.prop(Card.get(floor));
  }

};

export default Game;
