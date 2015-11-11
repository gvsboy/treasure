import m from 'mithril';
import _ from 'lodash';
import { svg } from '../../helpers/view';

export default function(ctrl, args) {

  var config = _.partial(args.animate, {
    player: args.player,
    boardVM: args.boardVM
  });

  return m('div.card.outcome', { config }, [
    svg(args.boardVM.outcomeCard().icon())
  ]);

};
