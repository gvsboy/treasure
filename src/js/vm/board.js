import m from 'mithril';
import _ from 'lodash';

import Matcher from '../services/matcher';

import Card from '../models/card';
import State from '../vm/state';

function Board(floor) {
  this.cards = m.prop(Card.get(floor));
  this.outcomeCard = m.prop(null);
  this.state = m.prop(new State());
  this._matcher = new Matcher();
}

Board.prototype = {

  getMatchedCards: function() {
    return State.filter(this.cards(), State.MATCHED);
  },

  selectCard: function(player, evt) {

    // Reference a card model object based on the click target.
    var card = Card.getByDOMElement(evt.target, this.cards()),
        state = this.state(),
        matcher = this._matcher;

    // If the board is locked the card is not successfully added
    // to the matcher, abort!
    if (state.isMatchingLocked() || !matcher.add(card)) {
      m.redraw.strategy('none');
      return;
    }

    // If there are enough cards for a match (probably 2),
    // let's generate an outcome.
    if (matcher.isReady()) {

      // Lock the board UI up.
      state.set(State.MATCHING);

      _.delay(() => {

        // If there's a match, the board fades out a bit and is still locked.
        if (this.outcomeCard(matcher.generateOutcome())) {
          state.set(State.MATCHED);
        }

        // Else, it's a no-go.
        else {
          state.set(State.DEFAULT);
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
