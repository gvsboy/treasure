import m from 'mithril';

import { svg } from '../../../helpers/view';

export default function(ctrl, args) {

  return m('div.outcome', { config: args.animate }, [
    m('div.card', { style: { fill: args.card.color() }}, [
      svg(args.card.icon())
    ]),
    m('ul.info', [
      m('li', args.card.name()), args.content
    ])
  ])
}
