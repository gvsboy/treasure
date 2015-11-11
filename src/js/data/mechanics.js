export const monster = {

  "Slime": {
    hp: 10,
    attack: "1d6",
    defense: 2,
    speed: 1,
    exp: 6
  },

  "Rat": {
    hp: 8,
    attack: "1d4",
    defense: 1,
    speed: 2,
    exp: 4
  },

  "Bat": {
    hp: 6,
    attack: "1d4",
    defense: 1,
    speed: 3,
    exp: 4
  }

};

export const treasure = {

  "Bag of Coins": {
    value: 100
  },

  "Big Bag of Coins": {
    value: 300
  },

  "Stack of Coins": {
    value: 250
  },

  "Tall Stack of Coins": {
    value: 750
  },

  "Ruby": {
    value: 1000
  },

  "Shimmering Ruby": {
    value: 3000
  }

};

export const trap = {

  "Tripwire": {
    save: "speed",
    power: 8,
    result: {
      updateHealth: "1d4"
    }
  },

  "Razorwire": {
    save: "speed",
    power: 12,
    result: {
      updateHealth: "2d4"
    }
  },

  "Net": {
    save: "speed",
    power: 10,
    result: {
      updateHealth: "1d4",
      updateEnergy: "1d4"
    }
  },

  "Chain Net": {
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
    energy: 3
  },

  "Delicious Apple": {
    energy: 5
  },

  "Bread": {
    energy: 4
  },

  "Honey Bread": {
    energy: 7
  }

};

export const weapon = {

  "Short Sword": {
    attack: "1d6"
  },

  "Iron Sword": {
    attack: "1d6+1"
  },

  "Mace": {
    attack: "1d8"
  },

  "Iron Mace": {
    attack: "1d8+1"
  }

};

export const armor = {

  "Leather Vest": {
    defense: 1
  },

  "Padded Vest": {
    defense: 2
  }

};

export const magic = {

  "Fire Scroll": {
    type: "fire",
    attack: "2d8"
  },

  "Blaze Scroll": {
    type: "fire",
    attack: "3d8"
  }

};
