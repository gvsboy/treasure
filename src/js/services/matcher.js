import _ from 'lodash';

import STATES from '../config/states';

import Card from '../models/card';

function Matcher(cardsVM) {
  this._cardsVM = cardsVM;
  this.reset();
}

Matcher.prototype = {

  add: function(card) {
    if (!card || _.includes(this._cards, card) || this._cardsVM(card.id).state() === 'taken') {
      return false;
    }
    this._cardsVM(card.id).state(STATES.MATCHING);
    this._cards.push(card);
    return true;
  },

  isReady: function() {
    return this._cards.length > 1;
  },

  reset: function(hard) {
    if (hard) {
      this._allSetState(STATES.DEFAULT);
    }
    this._cards = [];
  },

  generateOutcome: function() {

    var generatedCard = null;

    // If types match, things are looking good! Technically some sort of match.
    if (this._allMatch('type')) {

      // If the names match--even better.
      // You've got a chance at some uncommon or rare stuff.
      if (this._allMatch('name')) {

        // Setting to matched will trigger the animation.
        this._allSetState(STATES.MATCHED);

        // Hardcode for now...
        generatedCard = Card.getByName(this._cards[0].name());
      }

    }

    this.reset(!generatedCard);
    return generatedCard;
  },

  _allMatch: function(property) {
    var values = _.invoke(this._cards, property);
    return _.uniq(values).length === 1;
  },

  _allSetState: function(state) {
    _.forEach(this._cards, card => {
      this._cardsVM(card.id).state(state);
    });
  }

};

export default Matcher;
