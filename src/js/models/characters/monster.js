import m from 'mithril';

import Dice from '../../mechanics/dice';

import Character from './character';

class Monster extends Character {

  constructor(data) {
    super(data);
    this.type = m.prop(data.type);
    this.exp = m.prop(this._calculateExp());
  }

  _calculateExp() {
    return this.health() +
      this.strength() +
      this.vitality() +
      this.speed() +
      this.magic() +
      Dice.roll(this.attack(), true) +
      this.defense() +
      ((this.level() - 1) * 10);
  }

}

export default Monster;
