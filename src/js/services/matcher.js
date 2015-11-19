import _ from 'lodash';

import STATES from '../config/states';

import Card from '../models/card';
import Uncommons from '../data/Uncommons';
import Dice from '../mechanics/dice';

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
      this._allSetState(STATES.MATCHED);
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
  },

  _allSetState: function(state) {
    _.forEach(this._cards, card => {
      this._cardsVM(card.id).state(state);
    });
  }

};

export default Matcher;
