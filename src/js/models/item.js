import m from 'mithril';
import _ from 'lodash';

import Mechanics from '../data/mechanics';

function Item(data) {
  this.name = m.prop(data.name);
  this.type = m.prop(data.type);
  this.icon = m.prop(data.icon);
}

Item.prototype = {

  activate: function(board, player) {
    var mechanic = Mechanics[this.type()][this.name()];
    console.log(board.state());
    this[`_use${_.capitalize(this.type())}`](mechanic);
  },

  _useMagic: function(data) {
    console.log(data)
  }

};

export default Item;
