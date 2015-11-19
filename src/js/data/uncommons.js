import _ from 'lodash';

import Card from '../models/card';

var map = {

  "uncommons": {

    "Slime": ["Blue Slime"],
    "Rat": ["Giant Rat"],
    "Bat": ["Angry Bat"],

    "Bag of Coins": ["Big Bag of Coins"],
    "Stack of Coins": ["Tall Stack of Coins"],
    "Ruby": ["Shimmering Ruby"],

    "Tripwire": ["Razorwire"],
    "Net": ["Chain Net"],

    "Apple": ["Delicious Apple"],
    "Bread": ["Honey Bread"],

    "Short Sword": ["Iron Sword"],
    "Mace": ["Iron Mace"],

    "Leather Vest": ["Padded Vest"],

    "Fire Scroll": ["Blaze Scroll"]

  },

  // Not using these yet
  "rares": {
    "Slime": ["Blorp"],
    "Rat": ["Nibbles"],
    "Bat": ["Leatherwing"]
  }

};

function getter(type, cardName) {
  var randomCardName = _.sample(map[type][cardName]);
  console.log('UNCOMMON!!', randomCardName);
  return Card.getByName(randomCardName);
}

export default {
  getUncommon: _.partial(getter, 'uncommons'),
  getRare: _.partial(getter, 'rares')
};
