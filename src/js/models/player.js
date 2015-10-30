import m from 'mithril';

function Player() {

  var health = 50,
      energy = 20;

  this.floor = m.prop(1);
  this.health = m.prop(health);
  this.maxHealth = m.prop(health);
  this.energy = m.prop(energy);
  this.maxEnergy = m.prop(energy);
}

export default Player;
