import m from 'mithril';
import _ from 'lodash';

function Inventory(player) {
  this.items = m.prop([]);
  this._player = player;
}

Inventory.prototype = {

  add: function(item) {
    this.items().push(item);
  },

  drop: function(item) {
    _.pull(this.items(), item);
  },

  getByDOMElement: function(el) {

    var li = el.closest('li'),
        siblings = li.parentNode.children,
        index = _.indexOf(siblings, li);

    return this.items()[index];
  },

  useByDOMElement: function(board, evt) {

    //if (board.state().isMatchingLocked()) {
      //m.redraw.strategy('none');
      //return;
    //}

    this.getByDOMElement(evt.target).use(board, this._player);
  }

};

export default Inventory;
