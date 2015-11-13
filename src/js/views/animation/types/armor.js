import m from 'mithril';

import { revealToInventory } from '../../../helpers/animation';

import view from './base';

export default function(ctrl, args) {
  return m.component({ view }, { card: ctrl.card, animate: revealToInventory, content: [
    m('li.armor', `${ctrl.data.attack} Defense`)
  ]});
}
