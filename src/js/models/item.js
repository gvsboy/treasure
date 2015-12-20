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

  select: function() {
    return this._setState(State.SELECTED);
  },

  unselect: function() {
    return this._setState(State.DEFAULT);
  },

  equip: function() {
    return this._setState(State.EQUIPPED);
  },

  unequip: function() {
    return this.unselect();
  },

  isEquipped: function() {
    return this.state().is(State.EQUIPPED);
  },

  isBattleOnly: function() {
    return this.mechanics().usage === 'battle';
  },

  isEquippable: function() {
    var type = this.type();
    return type === 'weapon' || type === 'armor';
  },

  _setState: function(value) {
    this.state().set(value);
    return this;
  }

};

export default Item;
