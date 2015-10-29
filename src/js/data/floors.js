import _ from 'lodash';

var floors = [

  // 1
  {
    Slime: 4,
    Rat: 4,
    Bat: 4,
    'Bag of Coins': 2,
    'Stack of Coins': 2,
    Ruby: 2,
    Tripwire: 2,
    Net: 2,
    Apple: 2,
    Bread: 2,
    Mace: 2,
    'Short Sword': 2,
    'Leather Vest': 2,
    'Fire Scroll': 2,
    Stairs: 2
  }

];

export default {

  get: function(index) {
    return _.clone(floors[index - 1], true);
  }

};
