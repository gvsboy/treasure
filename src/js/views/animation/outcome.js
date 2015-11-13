import m from 'mithril';
import controller from '../../controllers/animation/type';
import treasure from './types/treasure';
import food from './types/food';

var typeMap = {
  treasure,
  food
};

export default function(ctrl, args) {

  var card = args.boardVM.outcomeCard(),
      view = typeMap[card.type()];

  return m.component({ view, controller }, { player: args.player, boardVM: args.boardVM });
};
