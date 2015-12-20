import m from 'mithril';

export default function(ctrl, args) {
  var mechanics = ctrl.data.mechanics();
  return m('h3', `${mechanics.attack} ${mechanics.element} Magic`);
};
