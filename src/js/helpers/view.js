import m from 'mithril';

export function svg(name = 'clover-spiked') {
  return m('svg',
    m('use[href="#' + name + '"]')
  );
}
