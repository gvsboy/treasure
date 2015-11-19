// NOTE: Let's calculate the exp using an algo!

export const monster = {

  // Slimes
  "Slime": {
    type: "slime",
    hp: 10,
    attack: "1d6",
    defense: 2,
    speed: 1
  },

  "Blue Slime": {
    type: "slime",
    hp: 16,
    attack: "1d8+1",
    defense: 3,
    speed: 2
  },

  "Blorp": {
    type: "slime",
    hp: 23,
    attack: "2d8",
    defense: 5,
    speed: 2
  },

  // Rats
  "Rat": {
    type: "rat",
    hp: 8,
    attack: "1d4",
    defense: 1,
    speed: 2
  },

  "Giant Rat": {
    type: "rat",
    hp: 13,
    attack: "2d4",
    defense: 1,
    speed: 3
  },

  "Nibbles": {
    type: "rat",
    hp: 20,
    attack: "3d4",
    defense: 2,
    speed: 5
  },

  // Bats
  "Bat": {
    type: "bat",
    hp: 6,
    attack: "1d4",
    defense: 1,
    speed: 3
  },

  "Angry Bat": {
    type: "bat",
    hp: 10,
    attack: "2d4+1",
    defense: 1,
    speed: 5
  },

  "Leatherwing": {
    type: "bat",
    hp: 16,
    attack: "2d6+1",
    defense: 2,
    speed: 7
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
    result: {
      updateHealth: "1d4"
    }
  },

  "Razorwire": {
    type: "tripwire",
    save: "speed",
    power: 12,
    result: {
      updateHealth: "2d4"
    }
  },

  "Net": {
    type: "net",
    save: "speed",
    power: 10,
    result: {
      updateHealth: "1d4",
      updateEnergy: "1d4"
    }
  },

  "Chain Net": {
    type: "net",
    save: "speed",
    power: 13,
    result: {
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
    energy: 5
  },

  "Bread": {
    type: "bread",
    energy: 4
  },

  "Honey Bread": {
    type: "bread",
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
    attack: "1d6+1"
  },

  "Mace": {
    type: "mace",
    attack: "1d8"
  },

  "Iron Mace": {
    type: "mace",
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
