import m from 'mithril';

import DOM from '../../../config/dom';
import A from '../../../helpers/animation';

import view from './base';

function animate(el, isInit, context) {

  // Reference the gold status, show the card and information.
  var goldStatus = document.getElementById(DOM.ID.GOLD_STATUS),
      card = A.getAndRevealCardAndInfo(el).card;

  // Now, move the card to the end of the energy bar.
  A.leapTo(card, {
    top: A.top(goldStatus),
    left: A.left(goldStatus),
    callback: m.redraw
  });
}

export default function(ctrl, args) {
  return m.component({ view }, { card: ctrl.card, animate, content: [
    m('li.gold', `${ctrl.data.gold} Gold`)
  ]});
}