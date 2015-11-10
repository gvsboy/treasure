import m from 'mithril';
import { svg } from '../helpers/view';

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
