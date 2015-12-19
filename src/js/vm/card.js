import m from 'mithril';
import _ from 'lodash';

import Mechanics from '../mechanics/mechanics';

import State from '../vm/state';

function Card(data) {
  this.id = 'card-' + _.uniqueId();
  this.name = m.prop(data.name);
  this.type = m.prop(data.type);
  this.icon = m.prop(data.icon);
  this.color = m.prop(data.color);
  this.state = m.prop(new State());
}

Card.prototype = {

  /**
   * Retrieves the proper mechanics for the card and invokes them.
   * @param  {Player} player The player to invoke the mechanics on.
   */
  activate: function(player) {
    var mechanic = Mechanics.get(this);
    return mechanic(player);
  }

};

export default Card;
