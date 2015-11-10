import m from 'mithril';

function Board() {
  this.state = m.prop('');
}

Board.prototype = {

  isLocked: function() {
    var state = this.state();
    return state === 'matching' || state === 'matched';
  }

};

export default Board;
