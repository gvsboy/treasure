import m from 'mithril';

function Player() {

  var health = 30,
      energy = 20;

  this.floor = m.prop(1);
  this.turns = m.prop(0);

  this.health = m.prop(health);
  this.maxHealth = m.prop(health);
  this.energy = m.prop(energy);
  this.maxEnergy = m.prop(energy);

  this.strength = m.prop(5);
  this.vitality = m.prop(2);
  this.speed = m.prop(2);
  this.magic = m.prop(1);

  this.attack = m.prop('1d4');
  this.defense = m.prop(2);

  this.level = m.prop(1);
  this.gold = m.prop(0);
  this.exp = m.prop(0);

  this.items = m.prop([]);
}

Player.prototype = {

  incrementTurn: function() {
    this.turns(this.turns() + 1);
  },

  takeCard: function(card) {
    card.activate(this);
  },

  updateHealth: function(amount) {
    this.health(this.health() + amount);
  },

  updateEnergy: function(amount) {
    this.energy(this.energy() + amount);
  },

  updateGold: function(amount) {
    this.gold(this.gold() + amount);
  },

  addItem: function(item) {
    this.items().push(item);
  }

};

export default Player;
