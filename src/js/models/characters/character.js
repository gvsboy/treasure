import m from 'mithril';

class Character {

  constructor(data) {
    this.health = m.prop(data.health);
    this.maxHealth = m.prop(data.health);
    this.strength = m.prop(data.strength);
    this.vitality = m.prop(data.vitality);
    this.speed = m.prop(data.speed);
    this.magic = m.prop(data.magic);
    this.attack = m.prop(data.attack);
    this.defense = m.prop(data.defense);
  }

  attack(target) {
    target.updateHealth(this.attack());
  }

  updateHealth(amount) {
    this.health(this.health() + amount);
  }

}

export default Character;
