import m from 'mithril';
import _ from 'lodash';

import STATES from '../config/states';
import Matcher from '../services/matcher';

import cardsVM from '../vm/cards';
import Card from '../models/card';

/**
 * Retrieves a card from an array of cards that matches the
 * given element.
 * @param {DOMElement} el The elment to fetch a card from.
 * @param {Array} cards A collection of card models.
 * @return {Card} The matched card.
 */
function getCardByDOMReference(el, cards) {

  var card = el.closest('.card'),
      index = _.indexOf(document.getElementById('board').children, card);

  return cards[index];
}

export default function(args) {

  var matcher = new Matcher(cardsVM);

  this.player = args.player;

  // Fetch new cards for the passed floor.
  this.cards = args.cards;

  // Set the board view-model;
  this.boardVM = args.boardVM;

  // Set the cards view-model.
  this.cardsVM = cardsVM;

  // Select a card to match.
  this.select = function(evt) {

    // Reference a card model object based on the click target.
    var card = getCardByDOMReference(evt.target, this.cards()),
        boardVM = this.boardVM();

    // If the board is locked the card is not successfully added
    // to the matcher, abort!
    if (boardVM.isLocked() || !matcher.add(card)) {
      m.redraw.strategy('none');
      return;
    }

    // If there are enough cards for a match (probably 2),
    // let's generate an outcome.
    if (matcher.isReady()) {

      // Lock the board UI up.
      boardVM.state(STATES.MATCHING);

      _.delay(() => {

        // If there's a match, the board fades out a bit and is still locked.
        if (boardVM.outcomeCard(matcher.generateOutcome())) {
          boardVM.state(STATES.MATCHED);
        }

        // Else, it's a no-go.
        else {
          boardVM.state(STATES.DEFAULT);
        }

        this.player().incrementTurn();
        this.player().updateEnergy(-1);
        m.redraw();

      }, 1000);
    }

  }.bind(this);

}
