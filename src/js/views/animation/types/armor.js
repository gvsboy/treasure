import m from 'mithril';

export default function(ctrl, args) {
  return m('h3', `${ctrl.data.mechanics().defense} Defense`);
};
