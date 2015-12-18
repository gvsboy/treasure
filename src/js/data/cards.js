import _ from 'lodash';

import Mechanics from './mechanics';

var DEFAULT_COLOR = '#f8f4be';

var iconMap = {
  "slime": "fleshy-mass",
  "rat": "mouse",
  "bat": "bat",
  "coin bag": "cash",
  "coin stack": "coins",
  "ruby": "rupee",
  "tripwire": "tripwire",
  "net": "fishing-net",
  "apple": "shiny-apple",
  "bread": "sliced-bread",
  "short sword": "stiletto",
  "mace": "spiked-mace",
  "leather armor": "leather-vest",
  "scroll": "tied-scroll",
  "stairs": "stairs"
};

var cards = _.flatten(_.map(Mechanics, (type, typeName) => {
  return _.map(type, (card, cardName) => {
    return {
      name: cardName,
      type: typeName,
      icon: iconMap[card.type],
      color: card.color || DEFAULT_COLOR
    };
  })
}));

export default {

  get: function() {
    return _.clone(cards, true);
  }

};
