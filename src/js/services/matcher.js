import _ from 'lodash';

import Uncommons from '../data/Uncommons';
import Dice from '../mechanics/dice';

import Card from '../models/card';
import State from '../vm/state';

function Matcher() {
  this.reset();
}

Matcher.prototype = {

  add: function(card) {
    if (!card || _.includes(this._cards, card) || card.state().is(State.TAKEN)) {
      return false;
    }
    card.state().set(State.MATCHING);
    this._cards.push(card);
    return true;
  },

  isReady: function() {
    return this._cards.length > 1;
  },

  reset: function(hard) {
    if (hard) {
      State.stamp(this._cards, State.DEFAULT);
    }
    this._cards = [];
  },

  generateOutcome: function() {

    var generatedCard = null,
        cardName;

    // If types match, things are looking good! Technically some sort of match.
    if (this._allMatch('type')) {

      // If the names match--even better.
      // You've got a chance at some uncommon or rare stuff.
      if (this._allMatch('name')) {

        cardName = _.first(this._cards).name();

        // You've got a 25% chance and uncommon stuff!
        if (Dice.roll('1d100') > 75) {
          generatedCard = Uncommons.getUncommon(cardName);
        }
        else {
          generatedCard = Card.getByName(cardName);
        }
      }

      // Otherwise, its a 50/50.
      else {
        cardName = _.sample(this._allGetPropertyValues('name'));
        generatedCard = Card.getByName(cardName);
      }

      // Setting to matched will trigger the animation.
      State.stamp(this._cards, State.MATCHED);
    }

    this.reset(!generatedCard);
    return generatedCard;
  },

  _allGetPropertyValues: function(property) {
    return _.invoke(this._cards, property);
  },

  _allMatch: function(property) {
    var values = this._allGetPropertyValues(property);
    return _.uniq(values).length === 1;
  }

};

export default Matcher;
