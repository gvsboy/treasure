import _ from 'lodash';
import {trap} from '../data/mechanics';
import Dice from './dice';

/**
 * Traps negatively affect players unless they successfully roll
 * a saving throw.
 * @param  {Player} player The player to affect.
 * @return {[type]}        [description]
 */
export default function(player) {

  var data = trap[this.name()],
      roll = Dice.roll('1d20'),
      bonus = player[data.save](),
      devastating = roll === 1;

  // If your attempts are lower than the trap's power,
  // you are affected.
  if (roll + bonus < data.power) {
    _.forEach(_.keys(data.result), method => {
      var roll = Dice.roll(data.result[method], devastating);
      player[method](-roll);
    });
  }

  return data;
};
