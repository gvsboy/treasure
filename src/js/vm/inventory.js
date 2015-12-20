import m from 'mithril';
import _ from 'lodash';

import State from './state';

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

  getEquipped: function(type) {
    return _.find(this.items(), item => {
      return item.isEquipped() && item.type() === type;
    });
  },

  getSelected: function() {
    return _.find(this.items(), item => item.isSelected());
  },

  getByDOMElement: function(el) {

    var li = el.closest('li'),
        siblings = li.parentNode.children,
        index = _.indexOf(siblings, li);

    return this.items()[index];
  },

  selectItem: function(board, evt) {

    //if (board.state().isMatchingLocked()) {
      //m.redraw.strategy('none');
      //return;
    //}

    var item = this.getByDOMElement(evt.target),
        isBattle = board.state().is(State.BATTLE);

    // If we're in a battle right now, queue the item up
    // instead of activating it.
    if (isBattle) {
      if (!item.isEquipped()) {
        this._select(item);
      }
      return;
    }

    // If we're not in a battle and the item is battle-only, exit.
    else if (!isBattle && item.isBattleOnly()) {
      return;
    }

    if (item.isEquippable()) {
      this._equip(item);
    }
  },

  _equip(item) {

    var wasEquipped = item.isEquipped();

    // First, unequip all items of the same time.
    _.forEach(this.items(), i => {
      if (i.type() === item.type()) {
        i.unequip();
      }
    });

    if (!wasEquipped) {
      item.equip();
    }
  },

  _select(item) {

    var previousSelected = this.getSelected();

    if (!previousSelected) {
      item.select();
    }
    else {
      if (previousSelected === item) {
        item.unselect();
      }
      else {
        previousSelected.unselect();
        item.select();
      }
    }
  }

};

export default Inventory;
