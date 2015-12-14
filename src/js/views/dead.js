import m from 'mithril';

import { deadAnimation } from '../helpers/animation';

export default function() {
  return m('div.dead', { config: deadAnimation }, [
    m('h2', 'You\'re dead!'),
    m('button', 'Restart')
  ]);
};
