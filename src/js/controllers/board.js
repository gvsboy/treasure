import m from 'mithril';
import _ from 'lodash';

import STATES from '../config/states';
import Matcher from '../services/matcher';

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
      matcher = new Matcher(cardsVM);

  // Fetch new cards for the passed floor.
  this.cards = args.cards;

  // Set the board view-model;
  this.boardVM = args.boardVM;

  // Set the cards view-model.
  this.cardsVM = cardsVM;

  // Select a card to match.
  this.select = function(evt) {

    // Reference a card model object based on the click target.
    var card = getCardByDOMReference.call(this, evt.target),
        boardVM = this.boardVM;

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

        player.incrementTurn();
        player.updateEnergy(-1);
        m.redraw();

      }, 1000);
    }

  }.bind(this);

}
