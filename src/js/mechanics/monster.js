// QUICK HACK
import _ from 'lodash';

import Battle from '../services/battle';

import Monster from '../models/monster';
import { monster } from '../data/mechanics';

export default function(player) {
  return {
    battle: new Battle(player, new Monster(monster[this.name()])),
    freeze: true
  };
};
