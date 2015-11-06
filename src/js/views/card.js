import m from 'mithril';

function svg(name = 'clover-spiked') {
  return m('svg',
    m('use[href="#' + name + '"]')
  );
}

export default function(ctrl, args) {
  return m('li.card', { class: args.class },
    m('div.flipper', [
      m('div.front',
        svg(args.front)
      ),
      m('div.back',
        svg(args.back)
      )
    ])
  );
};
