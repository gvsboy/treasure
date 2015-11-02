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
