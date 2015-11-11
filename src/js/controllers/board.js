import m from 'mithril';
import _ from 'lodash';
import cardsVM from '../vm/cards';
import Card from '../models/card';

// not good
function getCardByDOMReference(el) {
  var card = el.closest('.card'),
      index = _.indexOf(document.getElementById('board').children, card);
  return this.cards[index];
}

export default function(args) {

  var player = args.player,
      previousCard;

  // Fetch new cards for the passed floor.
  this.cards = args.cards;

  // Set the board view-model;
  this.boardVM = args.boardVM

  // Set the cards view-model.
  this.cardsVM = cardsVM;

  // Select a card to match.
  this.select = function(evt) {

    // Reference a card model object based on the click target.
    var card = getCardByDOMReference.call(this, evt.target);

    // If the board is locked
    // or no card exists
    // or the card is the previous card
    // or the card has already been taken
    // cancel the redraw due to the fired event
    // and abort.
    if (this.boardVM.isLocked() || !card || previousCard === card || card.taken()) {
      m.redraw.strategy('none');
      return;
    }

    player.incrementTurn();

    // A card exists. Select it.
    this.cardsVM(card.id).state('selected');

    // A card was already selected. What up.
    if (previousCard) {

      // Lock it up.
      this.boardVM.state('matching');

      // If types match, things are looking good. Let's try and dig deeper.
      if (previousCard.type() === card.type() && previousCard.name() === card.name()) {

        // Set a class to flag capture animation.
        _.delay(() => {

          // Setting to matched will trigger the animation.
          this.cardsVM(card.id).state('matched');
          this.cardsVM(previousCard.id).state('matched');

          // We need logic to determine which card is actually selected.
          // For now, let's just hardcode it.
          this.boardVM.outcomeCard(Card.getByName(card.name()));

          // The board fades out a bit and is still locked.
          this.boardVM.state('matched');

          // Both cards are taken.
          card.taken(true);
          previousCard.taken(true);

          // Reset the previous card for the next go round.
          previousCard = null;

          // Turns take energy!
          player.updateEnergy(-1);

          // And ... go!
          m.redraw();
        }, 1000);
      }

      // Reset and restore board functionality.
      else {
        _.delay(() => {

          // No state = normal state.
          this.cardsVM(card.id).state('');
          this.cardsVM(previousCard.id).state('');
          previousCard = null;
          this.boardVM.state('');
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
