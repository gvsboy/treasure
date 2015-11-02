import _ from 'lodash';

export default {

  /**
   * Calculates dice throws using the common D&D format.
   * @param {String} diceFormat The dice to roll (e.g. 2d6 is two six-sided dice).
   * @param {Boolean} max Return the maximum roll.
   * @return {Number} The total value of the roll.
   */
  roll: function(diceFormat, max) {

    var [times, sides] = diceFormat.split('d');

    if (max) {
      return times * sides;
    }

    return _.reduce(
      _.times(times, _.partial(
        _.random, 1, sides, false
      )),
      (total, n) => total + n
    );
  }

};
