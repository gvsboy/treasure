import m from 'mithril';
import cardView from './card';

var card = {
 view: cardView
};

export default function(ctrl) {
  return m('ul#board', { onclick: ctrl.select }, [
    ctrl.cards.map(function(c) {
      var vm = ctrl.cardsVM(c.id);
      return m.component(card, {
        class: vm.state(),
        front: c.icon(),
        back: c.icon()
      })
    })
  ]);
};
