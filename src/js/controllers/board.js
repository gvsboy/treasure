import m from 'mithril';
import _ from 'lodash';
import Card from '../models/card';

function getCardByDOMReference(el) {
  var card = el.closest('.card'),
      index = _.indexOf(document.getElementById('board').children, card);
  return this.cards[index];
}

export default function(args) {

  var player = args.player,
      locked = false,
      previousCard;

  // Fetch new cards for the passed floor.
  this.cards = Card.get(player.floor());

  // Select a card to match.
  this.select = function(evt) {

    var card;

    // If the board is locked, don't do anything.
    if (locked) {
      return;
    }

    // Reference a card model object based on the click target.
    card = getCardByDOMReference.call(this, evt.target);

    // If no card exists
    // or the card is the previous card
    // or the card has already been taken
    // abort.
    if (!card || previousCard === card || card.taken()) {
      return;
    }

    // A card exists. Select it.
    card.selected(true);

    // A card was already selected. What up.
    if (previousCard) {

      // Lock it up.
      locked = true;

      // If types match, things are looking good. Let's try and dig deeper.
      if (previousCard.type() === card.type() && previousCard.name() === card.name()) {
          _.delay(() => {
            player.takeCard(card);
            card.selected(false);
            previousCard.selected(false);
            previousCard.taken(true);
            previousCard = null;
            locked = false;
            player.updateEnergy(-1);
            m.redraw();
          }, 1500);
      }

      // Reset and restore board functionality.
      // This is slightly cheesey but works!
      else {
        _.delay(() => {
          card.selected(false);
          previousCard.selected(false);
          previousCard = null;
          locked = false;
          player.updateEnergy(-1);
          m.redraw();
        }, 1500);
      }
    }

    // This is the first card. Cache it to match it.
    else {
      previousCard = card;
    }

  }.bind(this);

}
