import m from 'mithril';
import cardView from './card';

var cardComponent = {
 view: cardView
};

export default function(ctrl, args) {

console.log('board view:::', args.boardVM().state());

  return m('ul#board', { class: args.boardVM().state(), onclick: ctrl.select }, [

    ctrl.cards().map(function(card) {
      var vm = ctrl.cardsVM(card.id);
      return m.component(cardComponent, {
        id: card.id,
        class: vm.state(),
        front: card.icon(),
        back: card.icon(),
        color: card.color()
      })
    })
  ]);
};
