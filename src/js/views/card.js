import m from 'mithril';

function svg(name = 'clover-spiked') {
  return m('svg',
    m('use[href="#' + name + '"]')
  );
}

export default function(ctrl, args) {
  return m('li.card', { id: args.id, class: args.class, config: args.config },
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
