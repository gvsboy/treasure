import m from 'mithril';
import _ from 'lodash';
import Cards from '../data/cards';
import Floors from '../data/floors';

function Card(data) {
  this.name = m.prop(data.name);
  this.type = m.prop(data.type);
  this.icon = m.prop(data.icon);
  this.selected = m.prop(false);
  this.matched = m.prop(false);
}

Card.get = function(floor) {

  // Retrieve the card data to generate a floor.
  var floor = Floors.get(1);
  var allCards = Cards.get();

  // Finally used the spread method properly!
  // TIL pairs + spread = 'happiness'
  var cards = _.map(_.pairs(floor), _.spread(function(name, amount) {
    return _.times(amount, function() {
      var data = _.find(allCards, 'name', name);
      return new Card(data);
    });
  }));

  // Return the flattened, shuffled card list.
  return _.shuffle(_.flatten(cards));
};

export default Card;
