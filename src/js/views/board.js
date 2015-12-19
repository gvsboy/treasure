import m from 'mithril';
import _ from 'lodash';

import cardView from './card';

var cardComponent = {
 view: cardView
};

export default function(ctrl, args) {

  var board = args.boardVM(),
      clickHandler = _.bind(board.selectCard, board, args.player());

  return m('ul#board', { class: board.state().get(), onclick: clickHandler }, [

    _.map(board.cards(), card => {

      return m.component(cardComponent, {
        id: card.id,
        class: `${card.state().get()} ${card.type()}`,
        front: card.icon(),
        back: card.icon(),
        color: card.color()
      });

    })

  ]);
};
