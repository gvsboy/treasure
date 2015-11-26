import _ from 'lodash';
import {trap} from '../data/mechanics';
import Dice from './dice';

const ONE_HUNDRED = 100;

function calculateEvade(power, bonus) {

  var roll = Dice.roll('1d20');

  // If a 1 was rolled, you fumbled.
  if (roll === 1) {
    return 1;
  }

  // Otherwise, calculate the percentage that was evaded, maxing at 100%.
  return Math.min(((roll + bonus) / power) * ONE_HUNDRED, ONE_HUNDRED);
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
      devastating = evade === 1,
      results = { evade };

  // If your evasion attempt is not 100%, you are affected.
  if (evade < ONE_HUNDRED) {
    _.forEach(_.keys(data.effects), method => {
      var roll = Dice.roll(data.effects[method], devastating);
      player[method](-roll);
    });
  }

  return _.merge(results, data);
};
