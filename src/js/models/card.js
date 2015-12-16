import _ from 'lodash';

import CardData from '../data/cards';
import FloorData from '../data/floors';

import CardVM from '../vm/card';

// Cache card data for static methods. Should move this elsewhere.
var cardData = CardData.get(),
    Card = {};

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
  return _.map(_.shuffle(_.flatten(cards)), data => new CardVM(data));
};

Card.getByName = function(name) {
  return new CardVM(_.find(cardData, 'name', name));
};

/**
 * Retrieves a card from an array of cards that matches the
 * given element.
 * @param {DOMElement} el The elment to fetch a card from.
 * @param {Array} cards A collection of card models.
 * @return {Card} The matched card.
 */
Card.getByDOMElement = function(el, cards) {

  var card = el.closest('.card'),
      index = _.indexOf(document.getElementById('board').children, card);

  return cards[index];
};

export default Card;
