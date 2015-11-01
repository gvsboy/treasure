import {treasure} from '../data/mechanics';

export default function(player) {
  var data = treasure[this.name()];
  player.updateGold(data.value);
};
