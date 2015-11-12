import m from 'mithril';
import _ from 'lodash';
import Velocity from 'velocity-animate';
import { svg } from '../../../helpers/view';
import { getTop, getEndingLeft, width, height, top, left, under } from '../../../helpers/animation';

function animate(el, isInit, context) {

  var board = document.getElementById('board'),
      card = el.querySelector('.card'),
      info = el.querySelector('.info');

  // Center the card.
  card.style.top = getTop(board, card);
  card.style.left = getEndingLeft(board, card);

  // Place the info panel under the card.
  under(info, card);
  left(info, left(board));
  width(info, width(board));

  // Slide the info panel into view.
  info.style.display = 'none';
  Velocity(info, 'slideDown');

  // Now, move the card into the 'gold' status item.
  var goldLabel = document.getElementById('player-gold');
  Velocity(card, {
    top: top(goldLabel),
    left: left(goldLabel),
    scale: [ 0, 1.5 ]
  }, {
    delay: 1500,
    duration: 1000
  })
  .then(m.redraw);

  // And slide up the info panel to hide it.
  Velocity(info, 'slideUp', {
    delay: 1000
  });
}

export default function(ctrl, args) {

  var card = args.boardVM.outcomeCard(),
      data = card.activate(args.player);

  args.boardVM.outcomeCard(null);
  args.boardVM.state('');

  return m('div.outcome', { config: animate }, [
    m('div.card', [
      svg(card.icon())
    ]),
    m('ul.info', [
      m('li', card.name()),
      m('li.gold', `${data.gold} Gold`)
    ])
  ])
};
