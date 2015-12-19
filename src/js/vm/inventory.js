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

  useByIndex: function(board, evt) {

    var li = evt.target.closest('li'),
        siblings = li.parentNode.children,
        index = _.indexOf(siblings, li),
        item = this.items()[index];

    item.activate(board, this._player);
  }

};

export default Inventory;
