import m from 'mithril';
import _ from 'lodash';
import cardView from './card';

var card = {
  view: cardView
};

export default function(ctrl, args) {
  var cards = _.filter(ctrl.cards, card => ctrl.cardsVM(card.id).isMatched());
  return m('div.animations', [
    _.map(cards, function(c) {
      return m.component(card, {
        class: 'matched',
        front: c.icon(),
        back: c.icon()
      })
    })
  ]);
};
