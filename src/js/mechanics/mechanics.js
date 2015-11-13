import _ from 'lodash';
import TreasureMechanics from './treasure';
import TrapMechanics from './trap';
import FoodMechanics from './food';
import ItemMechanics from './item';
import MonsterMechanics from './monster';

var mechanicsMap = {
  treasure: TreasureMechanics,
  trap: TrapMechanics,
  food: FoodMechanics,
  weapon: ItemMechanics,
  armor: ItemMechanics,
  magic: ItemMechanics,
  monster: MonsterMechanics
};

export default {

  /**
   * Retrieves the proper mechanics for a given card.
   * @param {Card} card The card to retrieve mechanics for.
   * @return {Function} A mechanics method bound to the given card.
   */
  get: function(card) {
    return _.bind(mechanicsMap[card.type()], card);
  }

};
