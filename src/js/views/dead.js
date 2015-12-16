import m from 'mithril';

import { deadAnimation } from '../helpers/animation';

export default function(ctrl, args) {
  return m('div.dead', { config: deadAnimation }, [
    m('h2', 'You\'re dead!'),
    m('button', { onclick: args.start.bind(args, 1) }, 'Restart')
  ]);
};
