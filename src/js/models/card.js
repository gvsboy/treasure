import m from 'mithril';
import _ from 'lodash';
import CardData from '../data/cards';
import FloorData from '../data/floors';
import Mechanics from '../mechanics/mechanics';

function Card(data) {
  this.id = 'card-' + _.uniqueId();
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
    return mechanic(player);
  }

};

// Cache card data for static methods. Should move this elsewhere.
var cardData = CardData.get();

Card.get = function(floor) {

  // Retrieve the card data to generate a floor.
  var floorData = FloorData.get(floor);

  // Collect all the cards in data form. We'll actually create the card
  // objects in another loop so we can shuffle the data first; if we don't,
  // the ids will always be the same which will make cheating easier.
  var cards = _.map(_.pairs(floorData), _.spread(function(name, amount) {
    return _.times(amount, () => _.find(cardData, 'name', name));
  }));

  // Return the flattened, shuffled cards.
  return _.map(_.shuffle(_.flatten(cards)), data => new Card(data));
};

Card.getByName = function(name) {
  return new Card(_.find(cardData, 'name', name));
};

export default Card;
