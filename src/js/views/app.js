import m from 'mithril';

import DOM from '../config/dom';

import boardView from './board';
import boardController from '../controllers/board';
import barView from './bar';
import barController from '../controllers/bar';
import animationView from './animation/base';
import animationController from '../controllers/animation';
import inventoryView from './inventory';

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

// Inventory component.
var inventory = {
  view: inventoryView
};

// Animations component.
var animations = {
  view: animationView,
  controller: animationController
};

export default function(ctrl) {

  var player = ctrl.player,
      cards = ctrl.cards,
      boardVM = ctrl.boardVM;

  return m('div#container', [
    m('div.column.status', [
      m('ul', [
        m('li', 'Floor: ' + player.floor()),
        m('li', 'Level: ' + player.level()),
        m('li', 'Exp: ' + player.exp()),
        m(`li#${DOM.ID.GOLD_STATUS}`, 'Gold: ' + player.gold())
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
      m.component(inventory, { items: player.items() })
    ]),
    m('div.column', [
      m.component(board, { player,  cards, boardVM }),
      m.component(bar, { type: 'health', value: player.health, max: player.maxHealth }),
      m.component(bar, { type: 'energy', value: player.energy, max: player.maxEnergy })
    ]),
    m.component(animations, { cards, player, boardVM })
  ]);
};
