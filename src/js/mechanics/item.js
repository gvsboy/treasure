import Item from '../models/item';

export default function(player) {
  var item = new Item({
    name: this.name(),
    type: this.type(),
    icon: this.icon()
  });
  player.inventory.add(item);
  return item;
};
