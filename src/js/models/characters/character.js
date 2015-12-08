import m from 'mithril';

import Dice from '../../mechanics/dice';

class Character {

  constructor(data) {
    this.name = m.prop(data.name);
    this.health = m.prop(data.health);
    this.maxHealth = m.prop(data.health);
    this.strength = m.prop(data.strength);
    this.vitality = m.prop(data.vitality);
    this.speed = m.prop(data.speed);
    this.magic = m.prop(data.magic);
    this.attack = m.prop(data.attack);
    this.defense = m.prop(data.defense);
  }

  isDead() {
    return this.health() === 0;
  }

  attackMelee(target) {
    var damage = Dice.roll(this.attack());
    target.updateHealth(-damage);
    return damage;
  }

  updateHealth(amount) {

    var newHealth = this.health() + amount;

    if (newHealth > this.maxHealth()) {
      this.health(this.maxHealth());
    }
    else if (newHealth < 0) {
      this.health(0);
    }
    else {
      this.health(newHealth);
    }
  }

}

export default Character;
