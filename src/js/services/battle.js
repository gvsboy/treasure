import m from 'mithril';
import _ from 'lodash';

import Speed from '../config/speed';
import Dictionary from '../config/dictionary';
import Dice from '../mechanics/dice';

import Monster from '../models/characters/monster';

function Battle() {
  this.combatants = _.toArray(arguments);
  this.log = m.prop([]);
  this._nextRound();
}

Battle.prototype = {

  // I hate this but it's better than when it was in the view.
  onComplete: function(callback) {
    this._onComplete = callback;
  },

  _nextRound: function() {
    this.combatant = this._getNext();
    _.delay(this._executeTurn.bind(this), Speed.battle());
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

    var opponent = this._getNext(),
        result = this.combatant.act(opponent);

    this.log().push(result);

    m.redraw();

    if (opponent.isDead()) {
      _.delay(this._end.bind(this), Speed.battle() / 2, opponent);
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

    m.redraw();

    if (this._onComplete) {
      this._onComplete();
      _.delay(m.redraw, Speed.battle());
    }
  }

};

export default Battle;
