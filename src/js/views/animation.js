import m from 'mithril';
import _ from 'lodash';
import cardView from './card';

function position(id, card) {
  var realCard = document.getElementById(id);
  card.style.top = realCard.offsetTop + 'px';
  card.style.left = realCard.offsetLeft + 'px';
}

var card = {
  view: cardView
};

export default function(ctrl, args) {
  var cards = _.filter(ctrl.cards, card => ctrl.cardsVM(card.id).isMatched());
  return m('div.animations', [
    _.map(cards, function(c) {
      return m.component(card, {
        id: 'animate-' + c.id,
        class: 'matched',
        front: c.icon(),
        back: c.icon(),
        config: _.partial(position, c.id)
      })
    })
  ]);
};
