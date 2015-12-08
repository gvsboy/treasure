// QUICK HACK
import _ from 'lodash';

import Battle from '../services/battle';

import Monster from '../models/characters/monster';
import { monster } from '../data/mechanics';

export default function(player) {

  var data = monster[this.name()],
      opponent;

  data.name = this.name();
  opponent = new Monster(data);

  return {
    battle: new Battle(player, opponent),
    monster: opponent,
    freeze: true
  };
};
