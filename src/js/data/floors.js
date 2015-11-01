import _ from 'lodash';

var floors = [

  // 1
  {
    // Monsters
    Slime: 4,
    Rat: 4,
    Bat: 4,

    // Treasures
    'Bag of Coins': 2,
    'Stack of Coins': 2,
    Ruby: 2,

    // Traps
    Tripwire: 2,
    Net: 2,

    // Foods
    Apple: 2,
    Bread: 2,

    // Weapons
    Mace: 2,
    'Short Sword': 2,

    // Armor
    'Leather Vest': 2,

    // Magic
    'Fire Scroll': 2,

    Stairs: 2
  }

];

export default {

  get: function(index) {
    return _.clone(floors[index - 1], true);
  }

};
