import m from 'mithril';
import _ from 'lodash';

import cardView from './card';

var cardComponent = {
 view: cardView
};

export default function(ctrl, args) {

  var board = args.boardVM();

  return m('ul#board', { class: board.state(), onclick: board.selectCard.bind(board, args.player()) }, [

    _.map(board.cards(), card => {

      return m.component(cardComponent, {
        id: card.id,
        class: card.state(),
        front: card.icon(),
        back: card.icon(),
        color: card.color()
      });

    })

  ]);
};
