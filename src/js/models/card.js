import m from 'mithril';
import _ from 'lodash';
import CardData from '../data/cards';
import FloorData from '../data/floors';
import Mechanics from '../mechanics/mechanics';

function Card(data) {
  this.id = _.uniqueId();
  this.name = m.prop(data.name);
  this.type = m.prop(data.type);
  this.icon = m.prop(data.icon);
  this.taken = m.prop(false);
}

Card.prototype = {

  /**
   * Retrieves the proper mechanics for the card and invokes them.
   * @param  {Player} player The player to invoke the mechanics on.
   */
  activate: function(player) {
    var mechanic = Mechanics.get(this);
    mechanic(player);
  }

};

Card.get = function(floor) {

  // Retrieve the card data to generate a floor.
  var floorData = FloorData.get(floor);
  var cardData = CardData.get();

  // Finally used the spread method properly!
  // TIL pairs + spread = 'happiness'
  var cards = _.map(_.pairs(floorData), _.spread(function(name, amount) {
    return _.times(amount, function() {
      var data = _.find(cardData, 'name', name);
      return new Card(data);
    });
  }));

  // Return the flattened, shuffled card list.
  return _.shuffle(_.flatten(cards));
};

export default Card;
