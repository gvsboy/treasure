import m from 'mithril';
import _ from 'lodash';

import Mechanics from '../data/mechanics';

import State from '../vm/state';

function Item(data) {
  this.name = m.prop(data.name);
  this.type = m.prop(data.type);
  this.icon = m.prop(data.icon);
  this.mechanics = m.prop(data.mechanics);
  this.state = m.prop(new State());
}

Item.prototype = {

  use: function(board, player) {

    var isBattle = board.state().is(State.BATTLE);

    // If we're in a battle right now, queue the item up
    // instead of activating it.
    if (isBattle) {
      player.toggleBattleItem(this);
      return;
    }

    // If we're not in a battle and the item is battle-only, exit.
    else if (!isBattle && this.isBattleOnly()) {
      return;
    }

    // Otherwise, activate the item's powers!
    this.activate();
  },

  activate: function() {
    return this[`_use${_.capitalize(this.type())}`].apply(this, arguments);
  },

  select: function() {
    this.state().set(State.SELECTED);
    return this;
  },

  unselect: function() {
    this.state().set(State.DEFAULT);
    return this;
  },

  isBattleOnly: function() {
    return this.mechanics().usage === 'battle';
  },

  _useMagic: function() {
    console.log('magic  !', arguments);
  },

  _useWeapon: function() {
    console.log('weapon!');
  },

  _useArmor: function() {
    console.log('armor!');
  }
};

export default Item;
