import m from 'mithril';
import _ from 'lodash';

import Dice from '../mechanics/dice';

import Monster from '../models/characters/monster';

var INTERVAL = 2000;

function Battle() {
  this.combatants = _.toArray(arguments);
  this.log = m.prop([]);
  this._nextRound();
}

Battle.prototype = {

  _nextRound: function() {
    this.combatant = this._getNext();
    _.delay(this._executeTurn.bind(this), INTERVAL);
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

  _generateMessage: function(result) {

    var message = {
      action: `${this.combatant.name()} attacks!`
    };

    if (result > 0) {
      message.result = `${result} damage`;
    }
    else {
      message.result = 'Miss!';
    }

    message.icon = this.combatant.weaponIcon();

    return message;
  },

  _executeTurn: function() {

    var opponent = this._getNext(),
        result = this.combatant.attackMelee(opponent);

    this.log().push(this._generateMessage(result));

    m.redraw();

    if (opponent.isDead()) {
      _.delay(this._end.bind(this), INTERVAL / 2, opponent);
    }
    else {
      this._nextRound();
    }
  },

  _end: function(deceased) {

    this.log().push(`${deceased.name()} has been destroyed!`);

    if (deceased instanceof Monster) {
      this.combatant.updateExp(deceased.exp());
      this.log().push(`You earned ${deceased.exp()} experience points!`);
    }

    this.complete = true;
    m.redraw();
  }

};

export default Battle;
