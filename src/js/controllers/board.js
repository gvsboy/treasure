import m from 'mithril';
import _ from 'lodash';
import cardsVM from '../vm/cards';

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
          this.cardsVM(card.id).state('matched');
          this.cardsVM(previousCard.id).state('matched');
          this.boardVM.state('matched');
          card.taken(true);
          previousCard.taken(true);
          previousCard = null;
          player.updateEnergy(-1);
          m.redraw();
        }, 1000);

        /* TAKE THE CARD IMMEDIATELY:
          _.delay(() => {
            player.takeCard(card);
            previousCard.taken(true);
            previousCard = null;
            locked = false;
            player.updateEnergy(-1);
            m.redraw();
          }, 1500);
        */
      }

      // Reset and restore board functionality.
      // This is slightly cheesey but works!
      else {
        _.delay(() => {
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
