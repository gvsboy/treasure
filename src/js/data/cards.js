import _ from 'lodash';

var back = 'clover-spiked';

var cards = [

  // Monsters
  {
    name: 'Slime',
    type: 'monster',
    icon: 'fleshy-mass'
  },
  {
    name: 'Rat',
    type: 'monster',
    icon: 'mouse'
  },
  {
    name: 'Bat',
    type: 'monster',
    icon: 'bat'
  },

  // Treasures
  {
    name: 'Bag of Coins',
    type: 'treasure',
    icon: 'cash'
  },
  {
    name: 'Stack of Coins',
    type: 'treasure',
    icon: 'coins'
  },
  {
    name: 'Ruby',
    type: 'treasure',
    icon: 'rupee'
  },

  // Traps
  {
    name: 'Tripwire',
    type: 'trap',
    icon: 'tripwire'
  },
  {
    name: 'Net',
    type: 'trap',
    icon: 'fishing-net'
  },

  // Food
  {
    name: 'Apple',
    type: 'food',
    icon: 'shiny-apple'
  },
  {
    name: 'Bread',
    type: 'food',
    icon: 'sliced-bread'
  },

  // Weapons
  {
    name: 'Mace',
    type: 'weapon',
    icon: 'spiked-mace'
  },
  {
    name: 'Short Sword',
    type: 'weapon',
    icon: 'stiletto'
  },

  // Armor
  {
    name: 'Leather Vest',
    type: 'armor',
    icon: 'leather-vest'
  },

  // Magic
  {
    name: 'Fire Scroll',
    type: 'armor',
    icon: 'tied-scroll'
  },

  // Stairs
  {
    name: 'Stairs',
    type: 'stairs',
    icon: 'stairs'
  }

];

export default {

  get: function() {
    return _.clone(cards, true);
  }

};
