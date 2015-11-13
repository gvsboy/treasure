import m from 'mithril';

import DOM from '../../../config/dom';
import A from '../../../helpers/animation';

import view from './base';

function animate(el, isInit, context) {

  // Reference the energy bar, show the card and information.
  var healthBar = document.querySelector(DOM.CLASS.HEALTH_BAR),
      card = A.getAndRevealCardAndInfo(el).card;

  // Now, move the card to the end of the energy bar.
  A.leapTo(card, {
    top: A.top(healthBar),
    left: A.left(healthBar) + A.width(healthBar),
    callback: m.redraw
  });
}

export default function(ctrl, args) {
  return m.component({ view }, { card: ctrl.card, animate, content: [
    m('li.damage', `${ctrl.data.damage} Damage`)
  ]});
}
