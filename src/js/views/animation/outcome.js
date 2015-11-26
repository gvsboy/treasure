import m from 'mithril';

import { svg } from '../../helpers/view';
import { revealToInventory, revealToEnergyBar, revealToGold, trapAnimation } from '../../helpers/animation';

import controller from '../../controllers/animation/type';
import treasure from './types/treasure';
import food from './types/food';
import weapon from './types/weapon';
import armor from './types/armor';
import magic from './types/magic';
import trap from './types/trap';
import monster from './types/monster';

var typeMap = {
  treasure,
  food,
  weapon,
  armor,
  magic,
  trap,
  monster
};

var animationMap = {
  treasure: revealToGold,
  food: revealToEnergyBar,
  weapon: revealToInventory,
  armor: revealToInventory,
  magic: revealToInventory,
  trap: trapAnimation,
  monster: revealToEnergyBar
};

export default function(ctrl, args) {

  var card = args.boardVM.outcomeCard(),
      type = card.type(),
      view = typeMap[card.type()];

  return m('div.outcome', { class: type, config: animationMap[type] }, [
    m('div.card', { style: { fill: card.color() }}, [
      svg(card.icon())
    ]),
    m('div.info', [
      m('h2', card.name()),
      m.component({ view, controller }, { player: args.player, boardVM: args.boardVM })
    ])
  ]);
}
