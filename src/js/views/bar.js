import m from 'mithril';

export default function(ctrl) {
  return m('span.bar', { class: ctrl.type });
};
