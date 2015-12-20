import m from 'mithril';

import Dice from '../../mechanics/dice';
import Message from '../../services/message';

function bonus(value) {
  return Math.floor(value / 2);
}

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

  /**
   * This is the interface for acting upon an opponent during
   * a round of battle. Should be overwritten by extended classes.
   * @param {Character} target The entity to act against.
   * @return {*} The results of the action.
   */
  act(data) {
    data.character = this;
    return new Message(data);
  }

  attackMelee(target) {

    var hit = this.calculateToHit() >= target.calculateDodge(),
        damage = hit ? this.calculateMeleeDamage(target) : 0;

    if (damage) {
      target.updateHealth(-damage);
    }

    return { damage };
  }

  // there needs to be logic for resistance and amplification.
  attackMagic(data, target) {
    var base = Dice.roll(data.attack) + bonus(this.magic());
    target.updateHealth(-base);
    return base;
  }

  calculateDodge() {
    return this.defense() + bonus(this.speed());
  }

  calculateToHit() {
    return Dice.roll1d20() + bonus(this.strength());
  }

  calculateMeleeDamage(target) {
    var base = Dice.roll(this.attack()) + bonus(this.strength());
    return Math.max(base - bonus(target.vitality()), 0);
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
