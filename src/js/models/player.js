import m from 'mithril';

function Player() {
  this.health = m.prop(50);
  this.energy = m.prop(20);
}

export default Player;
