import Mechanics from '../data/mechanics';

import Item from '../models/item';

export default function(player) {
  var item = new Item({
    name: this.name(),
    type: this.type(),
    icon: this.icon(),
    mechanics: Mechanics[this.type()][this.name()]
  });
  player.inventory.add(item);
  return item;
};
