import m from 'mithril';

import DOM from '../config/dom';

import boardView from './board';
import barView from './bar';
import animationView from './animation/base';
import inventoryView from './inventory';
import optionsMenuView from './menus/options';
import optionsMenuController from '../controllers/menus/options';

var optionsMenu = {
  view: optionsMenuView,
  controller: optionsMenuController
};

// Board component.
var board = {
  view: boardView
};

// Bar component.
var bar = {
  view: barView
};

// Inventory component.
var inventory = {
  view: inventoryView
};

// Animations component.
var animations = {
  view: animationView
};

export default function(ctrl) {

  var player = ctrl.player();

  return m('div#container', [

    m('div#header', [
      m('h1', 'Bard Card'),
      m('span', ' (build 20d666)'),
      m.component(optionsMenu)
    ]),

    m('div#panels', [

      // Player status column.
      m('div.column.status', [
        m('ul', [
          m('li', player.name()),
          m('li', `Status: ${player.status()}`),
          m('li', 'Floor: ' + player.floor()),
          m('li', 'Level: ' + player.level()),
          m('li', `Exp: ${player.exp()}/${player.next()}`),
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
        m.component(inventory, ctrl)
      ]),

      // Game board column.
      m('div.column', [
        m.component(board, ctrl),
        m.component(bar, { type: 'health', value: player.health(), max: player.maxHealth() }),
        m.component(bar, { type: 'energy', value: player.energy(), max: player.maxEnergy() })
      ]),

      // Animations panel.
      m.component(animations, ctrl)
    ])
  ]);
};
