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

    if (isBattle) {
      player.toggleBattleItem(this);
      return;
    }

    else if (!isBattle && this.isBattleOnly()) {
      return;
    }

    this.activate();
  },

  activate: function() {
    this[`_use${_.capitalize(this.type())}`]();
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
    console.log('magic  !');
  },

  _useWeapon: function() {
    console.log('weapon!');
  },

  _useArmor: function() {
    console.log('armor!');
  }
};

export default Item;
