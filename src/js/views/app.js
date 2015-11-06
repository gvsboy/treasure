import m from 'mithril';
import boardView from './board';
import boardController from '../controllers/board';
import barView from './bar';
import barController from '../controllers/bar';
import animationView from './animation';
import animationController from '../controllers/animation';

// Board component.
var board = {
  view: boardView,
  controller: boardController
};

// Bar component.
var bar = {
  view: barView,
  controller: barController
};

var animations = {
  view: animationView,
  controller: animationController
};

export default function(ctrl) {

  var player = ctrl.player,
      cards = ctrl.cards;

  return m('div#container', [
    m('div.column.status', [
      m('ul', [
        m('li', 'Floor: ' + player.floor()),
        m('li', 'Level: ' + player.level()),
        m('li', 'Exp: ' + player.exp()),
        m('li', 'Gold: ' + player.gold())
      ]),
      m('hr'),
      m('ul', [
        m('li', 'Strength: ' + player.strength()),
        m('li', 'Vitality: ' + player.vitality()),
        m('li', 'Speed: ' + player.speed()),
        m('li', 'Magic: ' + player.magic())
      ]),
      m('hr'),
      m('ul', [
        m('li', 'Attack: ' + player.attack()),
        m('li', 'Defense: ' + player.defense())
      ]),
      m('hr'),
      m('ul', player.items().map(item => {
        return m('li', item.name());
      }))
    ]),
    m('div.column', [
      m.component(board, { player,  cards }),
      m.component(bar, { type: 'health', value: player.health, max: player.maxHealth }),
      m.component(bar, { type: 'energy', value: player.energy, max: player.maxEnergy })
    ]),
    m.component(animations, { cards })
  ]);
};
