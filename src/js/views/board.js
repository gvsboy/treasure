import m from 'mithril';
import cardView from './card';

var cardComponent = {
 view: cardView
};

export default function(ctrl) {
  return m('ul#board', { class: ctrl.boardVM.state(), onclick: ctrl.select }, [
    ctrl.cards.map(function(card) {
      var vm = ctrl.cardsVM(card.id);
      return m.component(cardComponent, {
        id: card.id,
        class: vm.state(),
        //front: card.icon(),
        back: card.icon(),
        color: card.color()
      })
    })
  ]);
};
