import m from 'mithril';
import _ from 'lodash';
import Card from '../models/card';

function getCardByDOMReference(el) {
  var card = el.closest('.card'),
      index = _.indexOf(document.getElementById('board').children, card);
  return this.cards[index];
}

export default function(args) {

  var previousCard,
      locked = false;

  // Fetch new cards for the passed floor.
  this.cards = Card.get(args.floor);

  // Select a card to match.
  this.select = function(evt) {

    var card;

    if (locked) {
      return;
    }

    card = getCardByDOMReference.call(this, evt.target);
    card.selected(true);

    // A card was already selected. What up.
    if (previousCard) {

      // If the previous card isn't this card, try to match.
      if (previousCard !== card) {

        // Lock it up.
        locked = true;

        // If types match, things are looking good. Let's try and dig deeper.
        if (previousCard.type() === card.type()) {
          console.log('same type oh snap! :::', card.type());
        }

        // Reset and restore board functionality.
        // This is slightly cheesey but works!
        else {
          _.delay(() => {
            card.selected(false);
            previousCard.selected(false);
            previousCard = null;
            locked = false;
            m.redraw();
          }, 1500);
        }
      }
    }

    // This is the first card. Cache it to match it.
    else {
      previousCard = card;
    }
  }.bind(this);

}
