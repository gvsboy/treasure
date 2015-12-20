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
      magic: 1
    });

    this.energy = m.prop(50);
    this.maxEnergy = m.prop(this.energy());

    this.floor = m.prop(1);
    this.turns = m.prop(0);
    this.gold = m.prop(0);
    this.exp = m.prop(0);
    this.next = m.prop(250);

    this.inventory = new Inventory(this);

    Card.getByName('Dagger').activate(this).equip();
    Card.getByName('Clothes').activate(this).equip();

    /* TESTING PURPOSES ONLY:::
    Card.getByName('Fire Scroll').activate(this);
    Card.getByName('Short Sword').activate(this);
    Card.getByName('Mace').activate(this);
    Card.getByName('Leather Vest').activate(this);
    Card.getByName('Padded Vest').activate(this);
    */
  }

  attack() {
    var weapon = this.inventory.getEquipped('weapon');
    if (weapon) {
      return weapon.mechanics().attack;
    }
    return '1d2';
  }

  defense() {
    var armor = this.inventory.getEquipped('armor');
    if (armor) {
      return armor.mechanics().defense;
    }
    return 2;
  }

  weaponIcon() {
    var weapon = this.inventory.getEquipped('weapon');
    if (weapon) {
      return weapon.icon();
    }
    return 'punch';
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

  act(target) {

    var selectedItem = this.inventory.getSelected();

    if (selectedItem) {

      if (selectedItem.type() === 'magic') {
        return super.act(this._useMagic(selectedItem, target));
      }

      else if (selectedItem.isEquippable()) {
        return super.act(this._useEquipment(selectedItem));
      }

    }

    return super.act(this.attackMelee(target));
  }

  _useMagic(item, target) {
    var damage = this.attackMagic(item.mechanics(), target);
    this.inventory.drop(item);
    return { damage, item };
  }

  _useEquipment(item) {
    this.inventory._equip(item);
    return { item };
  }

}

export default Player;
