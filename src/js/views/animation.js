import m from 'mithril';
import _ from 'lodash';
import Velocity from 'velocity-animate';
import cardView from './card';

function animate(id, card) {

  // Get a reference to the real card.
  var realCard = document.getElementById(id);

  // First, let's position the animated card over the real card.
  card.style.top = realCard.offsetTop + 'px';
  card.style.left = realCard.offsetLeft + 'px';

  var properties = {
    top: '20px',
    left: '100px'
  };

  var options = {
    duration: 2000
  };

  Velocity(card, properties, options);
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
        config: _.partial(animate, c.id)
      })
    })
  ]);
};
