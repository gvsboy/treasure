import m from 'mithril';
import _ from 'lodash';
import cardView from '../card';

export default function(ctrl, args) {

  return m('div', [
    _.map(args.cards, (card, index) => {

      var cardVM = args.cardsVM(card.id);

      return m.component({ view: cardView }, {
        id: 'animate-' + card.id,
        class: 'matched',
        front: card.icon(),
        back: card.icon(),
        config: _.partial(args.animate, { card, index, cardVM })
      });
    })
  ]);

};
