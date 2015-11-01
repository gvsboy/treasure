import m from 'mithril';

function svg(name = 'clover-spiked') {
  return m('svg',
    m('use[href="#' + name + '"]')
  );
}

// This is crap:
function cardWithState(card) {
  var selected = card.selected() ? '.selected' : '';
  var taken = card.taken() ? '.taken' : '';
  return 'li.card' + selected + taken;
}

export default function(ctrl) {
  return m('ul#board', { onclick: ctrl.select }, [
    ctrl.cards.map(function(card) {
      return m(cardWithState(card),
        m('div.flipper', [
          m('div.front',
            svg(card.icon())//svg()
          ),
          m('div.back',
            svg(card.icon())
          )
        ])
      );
    })
  ]);
};
