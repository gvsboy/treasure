import m from 'mithril';

function Monster(data) {

  this.type = m.prop(data.type);
  this.health = m.prop(data.hp);
  this.maxHealth = m.prop(data.hp);
  this.attack = m.prop(data.attack);
  this.defense = m.prop(data.defense);
  this.speed = m.prop(data.speed);

}

export default Monster;
