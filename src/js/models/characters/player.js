import m from 'mithril';

import Character from './character';
import Inventory from '../../vm/inventory';
import Card from '../card';

class Player extends Character {

  constructor() {

    super({
      name: 'Kais',
      health: 50,
      strength: 5,
      vitality: 2,
      speed: 2,
      magic: 1,
      attack: '1d4',
      defense: 6
    });

    this.energy = m.prop(50);
    this.maxEnergy = m.prop(this.energy());

    this.floor = m.prop(1);
    this.turns = m.prop(0);
    this.gold = m.prop(0);
    this.exp = m.prop(0);
    this.next = m.prop(50);

    this.inventory = new Inventory(this);

    Card.getByName('Fire Scroll').activate(this);
    Card.getByName('Short Sword').activate(this);
    Card.getByName('Leather Vest').activate(this);
    
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

  updateExp(amount) {
    this.exp(this.exp() + amount);
  }

  setBattleAction(action) {
    if (!this._batleAction) {
      this._batleAction = action;
    }
  }

}

export default Player;
