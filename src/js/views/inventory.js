import m from 'mithril';
import { svg } from '../helpers/view';

export default function(ctrl, args) {
  return m('ul#inventory', args.items.map(item => {
    return m('li', [
      svg(item.icon()),
      m('p', item.name())
    ])
  }));
};
