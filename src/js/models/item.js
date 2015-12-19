import m from 'mithril';
import _ from 'lodash';

import Mechanics from '../data/mechanics';

import State from '../vm/state';

function Item(data) {
  this.name = m.prop(data.name);
  this.type = m.prop(data.type);
  this.icon = m.prop(data.icon);
}

Item.prototype = {

  activate: function(board, player) {
    var mechanic = Mechanics[this.type()][this.name()];
    if (board.state().is(State.BATTLE)) {

    }
    this[`_use${_.capitalize(this.type())}`](mechanic);
  },

  _useMagic: function(data) {
  }

};

export default Item;
