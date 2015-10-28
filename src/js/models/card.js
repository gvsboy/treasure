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

  console.log(_.keys(floor));

  // For each piece of data, create and collect a card.
  var cards = Cards.get().map(function(card) {
    return new Card(card);
  });

  // Return the shuffled card list.
  return _.shuffle(cards);
};

export default Card;
