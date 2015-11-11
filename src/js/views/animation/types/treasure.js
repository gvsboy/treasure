import m from 'mithril';
import _ from 'lodash';
import { svg } from '../../../helpers/view';

export default function(ctrl, args) {

  return m('div.card.outcome', { config: args.animate }, [
    svg(args.card.icon())
  ]);
};
