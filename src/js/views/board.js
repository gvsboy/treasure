import m from 'mithril';

function svg(name = 'clover-spiked') {
  return m('svg',
    m('use[href="#' + name + '"]')
  );
}

export default function(ctrl) {
  return m('ul#cards', {onclick: ctrl.select.bind(ctrl)}, [
    ctrl.cards.map(function(card) {
      return m('li.card' + (card.selected() ? '.selected' : ''),
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
}
