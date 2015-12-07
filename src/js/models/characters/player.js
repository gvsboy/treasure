import m from 'mithril';

import Character from './character';

class Player extends Character {

  constructor() {

    super({
      health: 30,
      strength: 5,
      vitality: 2,
      speed: 2,
      magic: 1,
      attack: '1d4',
      defense: 2
    });

    this.energy = m.prop(20);
    this.maxEnergy = m.prop(this.energy());

    this.floor = m.prop(1);
    this.turns = m.prop(0);
    this.level = m.prop(1);
    this.gold = m.prop(0);
    this.exp = m.prop(0);

    this.items = m.prop([]);
  }

  incrementTurn() {
    this.turns(this.turns() + 1);
  }

  updateEnergy(amount) {
    this.energy(this.energy() + amount);
  }

  updateGold(amount) {
    this.gold(this.gold() + amount);
  }

  addItem(item) {
    this.items().push(item);
  }

}

export default Player;
