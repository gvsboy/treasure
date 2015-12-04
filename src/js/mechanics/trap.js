import _ from 'lodash';

import Dictionary from '../config/dictionary';

import {trap} from '../data/mechanics';
import Dice from './dice';

const ONE_HUNDRED = 100;

/**
 * Given the trap's power and an evasion bonus, calculate the percentage
 * at which the trap was evaded. 100% means the trap was totally evaded
 * and 1% means the trap was devastating.
 * @param {Number} power The trap's power.
 * @param {Number} bonus An extra value added to the roll.
 * @return {Number} The evasion percentage.
 */
function calculateEvade(power, bonus) {

  var roll = Dice.roll1d20();

  // If a 1 was rolled, you fumbled.
  if (roll === 1) {
    return 1;
  }

  // Otherwise, calculate the percentage that was evaded, maxing at 100%.
  return Math.min(((roll + bonus) / power) * ONE_HUNDRED, ONE_HUNDRED);
}

/**
 * Executes a list of effects on a player and returns the
 * translated results for a view to use.
 * @param  {Player} player The player to affect.
 * @param  {Object} effects An object containing the player's method to execute
 *                          and the dice to use.
 * @param {Boolean} isDevastating Are the effects critical?
 * @return {Object} The translated roll results.
 */
function executeEffects(player, effects, isDevastating) {
  return _.reduce(_.keys(effects), (results, method) => {
    var roll = Dice.roll(effects[method], isDevastating);
    player[method](-roll);
    results[Dictionary[method]] = roll;
    return results;
  }, {});
}

/**
 * Traps negatively affect players unless they successfully roll
 * a saving throw.
 * @param {Player} player The player to affect.
 * @return {Object} Data containing trap attributes and encounter results.
 */
export default function(player) {

  var data = trap[this.name()],
      evade = calculateEvade(data.power, player[data.save]()),
      isDevastating = evade === 1,
      calculated = { evade, isDevastating };

  // If your evasion attempt is not 100%, you are affected.
  if (evade < ONE_HUNDRED) {
    calculated.results = executeEffects(player, data.effects, isDevastating);
  }

  return _.merge(calculated, data);
};
