import m from 'mithril';
import _ from 'lodash';
import Velocity from 'velocity-animate';

import DOM from '../../../config/dom';
import A from '../../../helpers/animation';

import { svg } from '../../../helpers/view';

function animate(el, isInit, context) {

  var board = document.getElementById(DOM.ID.BOARD),
      card = el.querySelector(DOM.CLASS.CARD),
      info = el.querySelector(DOM.CLASS.INFO);

  // Center the card.
  card.style.top = A.getTop(board, card);
  card.style.left = A.getEndingLeft(board, card);

  // Place the info panel under the card.
  A.under(info, card);
  A.left(info, A.left(board));
  A.width(info, A.width(board));

  // Slide the info panel into view.
  info.style.display = 'none';
  Velocity(info, 'slideDown');

  // And slide up the info panel to hide it.
  Velocity(info, 'slideUp', {
    delay: 1000
  });

  // Now, move the card into the 'gold' status item.
  var goldLabel = document.getElementById(DOM.ID.STATUS_GOLD);
  A.leapTo(card, {
    top: A.top(goldLabel),
    left: A.left(goldLabel),
    callback: m.redraw
  });
}

export default function(ctrl, args) {

  return m('div.outcome', { config: animate }, [
    m('div.card', [
      svg(ctrl.card.icon())
    ]),
    m('ul.info', [
      m('li', ctrl.card.name()),
      m('li.energy', `${ctrl.data.energy} Energy`)
    ])
  ])
};
