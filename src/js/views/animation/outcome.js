import m from 'mithril';
import controller from '../../controllers/animation/type';
import treasure from './types/treasure';
import food from './types/food';
import weapon from './types/weapon';
import armor from './types/armor';
import magic from './types/magic';
import trap from './types/trap';
import monster from './types/monster';

var typeMap = {
  treasure,
  food,
  weapon,
  armor,
  magic,
  trap,
  monster
};

export default function(ctrl, args) {

  var card = args.boardVM.outcomeCard(),
      view = typeMap[card.type()];

  return m.component({ view, controller }, { player: args.player, boardVM: args.boardVM });
}
