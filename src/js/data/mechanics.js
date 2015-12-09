// NOTE: Let's calculate the exp using an algo!

var lv2Color = '#1dd3b0';

export const monster = {

  // Slimes
  "Slime": {
    type: "slime",
    health: 10,
    attack: "1d6",
    defense: 2,
    speed: 1,
    weaponIcon: 'goo-explosion'
  },

  "Sludge": {
    type: "slime",
    color: lv2Color,
    health: 16,
    attack: "1d8+1",
    defense: 3,
    speed: 2,
    weaponIcon: 'goo-explosion'
  },

  "Blorp": {
    type: "slime",
    health: 23,
    attack: "2d8",
    defense: 5,
    speed: 2,
    weaponIcon: 'goo-explosion'
  },

  // Rats
  "Rat": {
    type: "rat",
    health: 8,
    attack: "1d4",
    defense: 1,
    speed: 2,
    weaponIcon: 'grasping-claws'
  },

  "Giant Rat": {
    type: "rat",
    color: lv2Color,
    health: 13,
    attack: "2d4",
    defense: 1,
    speed: 3,
    weaponIcon: 'grasping-claws'
  },

  "Nibbles": {
    type: "rat",
    health: 20,
    attack: "3d4",
    defense: 2,
    speed: 5,
    weaponIcon: 'grasping-claws'
  },

  // Bats
  "Bat": {
    type: "bat",
    health: 6,
    attack: "1d4",
    defense: 1,
    speed: 3,
    weaponIcon: 'sharp-lips'
  },

  "Angry Bat": {
    type: "bat",
    color: lv2Color,
    health: 10,
    attack: "2d4+1",
    defense: 1,
    speed: 5,
    weaponIcon: 'sharp-lips'
  },

  "Leatherwing": {
    type: "bat",
    health: 16,
    attack: "2d6+1",
    defense: 2,
    speed: 7,
    weaponIcon: 'sharp-lips'
  }

};

export const treasure = {

  // Coin bags
  "Bag of Coins": {
    type: "coin bag",
    gold: 100
  },

  "Big Bag of Coins": {
    type: "coin bag",
    color: lv2Color,
    gold: 300
  },

  "Bursting Bag of Coins": {
    type: "coin bag",
    gold: 800
  },

  // Coin stacks
  "Stack of Coins": {
    type: "coin stack",
    gold: 250
  },

  "Tall Stack of Coins": {
    type: "coin stack",
    color: lv2Color,
    gold: 750
  },

  "Towering Stack of Coins": {
    type: "coin stack",
    gold: 2000
  },

  // Rubies
  "Ruby": {
    type: "ruby",
    gold: 1000
  },

  "Shimmering Ruby": {
    type: "ruby",
    color: lv2Color,
    gold: 3000
  },

  "Fist-Sized Ruby": {
    type: "ruby",
    gold: 7000
  }

};

export const trap = {

  "Tripwire": {
    type: "tripwire",
    save: "speed",
    power: 8,
    effects: {
      updateHealth: "1d4"
    }
  },

  "Razorwire": {
    type: "tripwire",
    color: lv2Color,
    save: "speed",
    power: 12,
    effects: {
      updateHealth: "2d4"
    }
  },

  "Net": {
    type: "net",
    save: "speed",
    power: 10,
    effects: {
      updateHealth: "1d4",
      updateEnergy: "1d4"
    }
  },

  "Chain Net": {
    type: "net",
    color: lv2Color,
    save: "speed",
    power: 13,
    effects: {
      updateHealth: "2d4",
      updateEnergy: "2d4"
    }
  }

};

export const food = {

  "Apple": {
    type: "apple",
    energy: 3
  },

  "Delicious Apple": {
    type: "apple",
    color: lv2Color,
    energy: 5
  },

  "Bread": {
    type: "bread",
    energy: 4
  },

  "Honey Bread": {
    type: "bread",
    color: lv2Color,
    energy: 7
  }

};

export const weapon = {

  "Short Sword": {
    type: "short sword",
    attack: "1d6"
  },

  "Iron Sword": {
    type: "short sword",
    color: lv2Color,
    attack: "1d6+1"
  },

  "Mace": {
    type: "mace",
    attack: "1d8"
  },

  "Iron Mace": {
    type: "mace",
    color: lv2Color,
    attack: "1d8+1"
  }

};

export const armor = {

  "Leather Vest": {
    type: "leather armor",
    defense: 1
  },

  "Padded Vest": {
    type: "leather armor",
    color: lv2Color,
    defense: 2
  }

};

export const magic = {

  "Fire Scroll": {
    type: "scroll",
    element: "fire",
    attack: "2d8"
  },

  "Blaze Scroll": {
    type: "scroll",
    color: lv2Color,
    element: "fire",
    attack: "3d8"
  }

};

export const stairs = {

  "Stairs": {
    type: "stairs"
  }

};

export default {
  monster,
  treasure,
  trap,
  food,
  weapon,
  armor,
  magic,
  stairs
};
