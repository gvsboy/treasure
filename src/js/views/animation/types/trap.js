import m from 'mithril';

export default function(ctrl, args) {
  console.log('trap data', ctrl.data);
  return m('div', [
    m('li', 'Evading'),
    m('div.bar-container', [
      m('div.bar', { class: 'evade' })
    ])
  ]);
}
