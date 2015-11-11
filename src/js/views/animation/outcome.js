import m from 'mithril';
import _ from 'lodash';
import { toPx, stack, getTop, getEndingLeft } from '../../helpers/animation';
import treasureView from './types/treasure';

// Now change it back and continue with the collection process.
/*
Velocity(flipper, {
  backgroundColor: '#123456',
  fill: '#ccc'
}, {
  duration: 200,
  complete: function() {
    opts.cardVM.state('taken');
    opts.boardVM.state('');
    opts.player.takeCard(opts.card);
    m.endComputation();
  }
});
*/

function animate(opts, cardEl) {
  var card = opts.boardVM.outcomeCard();
  var board = document.getElementById('board');
  cardEl.style.top = getTop(board, cardEl);
  cardEl.style.left = getEndingLeft(board, cardEl);
}

export default function(ctrl, args) {

  var card = args.boardVM.outcomeCard();

  var config = _.partial(animate, {
    player: args.player,
    boardVM: args.boardVM
  });

  return m.component({ view: treasureView }, { card, animate: config });
};
