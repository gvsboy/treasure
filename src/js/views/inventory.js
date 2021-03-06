import m from 'mithril';
import _ from 'lodash';

import { svg } from '../helpers/view';

export default function(ctrl, args) {

  var inventory = args.player().inventory,
      clickHandler = _.bind(inventory.selectItem, inventory, args.boardVM());

  return m('ul#inventory', { onclick: clickHandler }, _.map(inventory.items(), item => {
    return m('li', { class: item.state().get() },
      m('button', [
        svg(item.icon()),
        m('p', item.name())
      ])
    )
  }));
};
