import m from 'mithril';

import Character from './character';
import Inventory from '../../vm/inventory';
import Card from '../card';
import State from '../../vm/state';

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

  toggleBattleItem(item) {

    var currentItem = this._battleItem;

    // If no item is ready, select the passed item.
    if (!currentItem) {
      this._battleItem = item.select();
    }

    // If the current item is the passed item, unselect it.
    else if (currentItem === item) {
      this._battleItem = null;
      item.unselect();
    }

    // Otherwise, select the new item and unset the old.
    else {
      currentItem.unselect();
      this._battleItem = item.select();
    }
  }

}

export default Player;
