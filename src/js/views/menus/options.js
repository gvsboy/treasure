import m from 'mithril';

export default function(ctrl) {

  return m('div#menu-options', { class: ctrl.state().get() }, [
    m('button', { onclick: ctrl.toggle }, 'Options '),
    m('ul', [
      m('li', [
        m('label', 'Speed', [
          m('input', {
            type: 'range',
            value: ctrl.getSpeed(),
            min: 0.1,
            max: 2.0,
            step: 0.1,
            onchange: m.withAttr('value', ctrl.update)
          })
        ]),
        m('span.range-label.left', '< Faster'),
        m('span.range-label.right', 'Slower >')
      ])
    ])
  ]);

};
