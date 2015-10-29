import m from 'mithril';

function svg(name = 'clover-spiked') {
  return m('svg',
    m('use[href="#' + name + '"]')
  );
}

// This is crap:
function cardWithState(card) {
  return 'li.card' + (card.selected() ? '.selected' : '');
}

export default function(ctrl) {
  return m('ul#board', { onclick: ctrl.select.bind(ctrl) }, [
    ctrl.cards.map(function(card) {
      return m(cardWithState(card),
        m('div.flipper', [
          m('div.front',
            svg()
          ),
          m('div.back',
            svg(card.icon())
          )
        ])
      );
    })
  ]);
};
