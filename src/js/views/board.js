import m from 'mithril';
import cardView from './card';

var card = {
 view: cardView
};

export default function(ctrl) {
  return m('ul#board', { onclick: ctrl.select }, [
    ctrl.cards.map(function(c) {
      return m.component(card, {
        class: ctrl.getCardClasses(c),
        front: c.icon(),
        back: c.icon()
      })
    })
  ]);
};
