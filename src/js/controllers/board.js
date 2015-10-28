import _ from 'lodash';
import Card from '../models/card';

function getCardByDOMReference(el) {
  var card = el.closest('.card'),
      index = _.indexOf(document.getElementById('cards').children, card);
  return this.cards[index];
}

export default function() {

  var previousCard;

  this.cards = Card.get(1);

  this.select = function(evt) {

    var card = getCardByDOMReference.call(this, evt.target);
    card.selected(true);

    if (previousCard) {
      if (previousCard !== card) {
        console.log(previousCard.type() === card.type());
      }
    }
    else {
      previousCard = card;
    }
  };

}
