import m from 'mithril';
import _ from 'lodash';

import STATES from '../config/states';
import Matcher from '../services/matcher';

import Card from '../models/card';

function Board(floor) {
  this.cards = m.prop(Card.get(floor));
  this.outcomeCard = m.prop(null);
  this.state = m.prop('');

  this._matcher = new Matcher();
}

Board.prototype = {

  isLocked: function() {
    var state = this.state();
    return state === STATES.MATCHING || state === STATES.MATCHED || state === STATES.DEAD;
  },

  getMatchedCards: function() {
    return _.filter(this.cards(), card => card.isMatched());
  },

  selectCard: function(player, evt) {

    // Reference a card model object based on the click target.
    var card = Card.getByDOMElement(evt.target, this.cards()),
        matcher = this._matcher;

    // If the board is locked the card is not successfully added
    // to the matcher, abort!
    if (this.isLocked() || !matcher.add(card)) {
      m.redraw.strategy('none');
      return;
    }

    // If there are enough cards for a match (probably 2),
    // let's generate an outcome.
    if (matcher.isReady()) {

      // Lock the board UI up.
      this.state(STATES.MATCHING);

      _.delay(() => {

        // If there's a match, the board fades out a bit and is still locked.
        if (this.outcomeCard(matcher.generateOutcome())) {
          this.state(STATES.MATCHED);
        }

        // Else, it's a no-go.
        else {
          this.state(STATES.DEFAULT);
        }

        // I hate this reference to player. But it'll do for now...
        player.incrementTurn();
        player.updateEnergy(-1);
        m.redraw();

      }, 1000);
    }

  }

};

export default Board;
