import m from 'mithril';

import Dice from '../../mechanics/dice';

class Character {

  constructor(data) {
    this.level = m.prop(data.level || 1);
    this.name = m.prop(data.name);
    this.health = m.prop(data.health);
    this.maxHealth = m.prop(data.health);

    this.strength = m.prop(data.strength);
    this.vitality = m.prop(data.vitality);
    this.speed = m.prop(data.speed);
    this.magic = m.prop(data.magic);

    this.attack = m.prop(data.attack);
    this.defense = m.prop(data.defense);

    this.weaponIcon = m.prop(data.weaponIcon || 'punch');
  }

  isDead() {
    return this.health() === 0;
  }

  attackMelee(target) {

    var hit = this.calculateToHit() >= target.calculateDodge(),
        damage = hit ? this.calculateMeleeDamage(target) : 0;

    if (damage) {
      target.updateHealth(-damage);
    }

    return damage;
  }

  calculateDodge() {
    return this.defense() + Math.floor(this.speed() / 2);
  }

  calculateToHit() {
    return Math.floor(this.strength() / 2) + Dice.roll1d20();
  }

  calculateMeleeDamage(target) {
    var base = Dice.roll(this.attack()) + Math.floor(this.strength() / 2);
    return Math.max(base - Math.floor(target.vitality() / 2), 0);
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
