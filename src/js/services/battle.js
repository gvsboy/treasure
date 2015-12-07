import m from 'mithril';
import _ from 'lodash';

import Dice from '../mechanics/dice';

var INTERVAL = 2000;

function Battle() {
  this.combatants = _.toArray(arguments);
  this.log = m.prop([]);
  this._nextRound();
}

Battle.prototype = {

  _nextRound: function() {
    this.combatant = this._getNext();
    window.setTimeout(this._executeTurn.bind(this), INTERVAL);
  },

  /**
   * Calculates which combatant is the fastest this round.
   * @return {Object} The quickest combatant.
   */
  _getFastest: function() {

    // Roll 1d20 for each combatant and add related bonuses.
    var rolls = _.map(this.combatants, combatant => {
      return Dice.roll1d20() + combatant.speed();
    });

    // Find the index of the highest roll. This will match the combatant index.
    return this.combatants[_.indexOf(rolls, _.max(rolls))];
  },

  _getNext: function() {

    var current = this.combatant,
        combatants = this.combatants;

    if (!current) {
      return this._getFastest();
    }
    return _.last(combatants) === current ? _.first(combatants) : combatants[_.indexOf(combatants, current) + 1];
  },

  _executeTurn: function() {

    var opponent = this._getNext();
    var message;

    if (this.combatant === this._getFastest()) {
      message = 'hit';
    }
    else {
      message = 'miss';
    }
    this.log().push(message);

    console.log(this.log());
    m.redraw();
    this._nextRound();
  }

};

export default Battle;
