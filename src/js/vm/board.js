import m from 'mithril';

import STATES from '../config/states';

function Board() {
  this.state = m.prop('');
  this.outcomeCard = m.prop(null);
}

Board.prototype = {

  isLocked: function() {
    var state = this.state();
    return state === STATES.MATCHING || state === STATES.MATCHED || state === STATES.DEAD;
  }

};

export default Board;
