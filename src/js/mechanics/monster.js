// QUICK HACK
import _ from 'lodash';
import { monster } from '../data/mechanics';
import Dice from './dice';

/**
 * Traps negatively affect players unless they successfully roll
 * a saving throw.
 * @param  {Player} player The player to affect.
 * @return {[type]}        [description]
 */
export default function(player) {

  var data = monster[this.name()],
      roll = Dice.roll(data.attack);

  data.damage = roll;
  player.updateHealth(-roll);

  return data;
};
