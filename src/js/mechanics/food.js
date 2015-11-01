import {food} from '../data/mechanics';

export default function(player) {
  var data = food[this.name()];
  player.updateEnergy(data.energy);
};
