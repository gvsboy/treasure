import _ from 'lodash';

/**
 * Calculates dice throws using the common D&D format.
 * @param {String} diceFormat The dice to roll (e.g. 2d6 is two six-sided dice).
 * @param {Boolean} max Return the maximum roll.
 * @return {Number} The total value of the roll.
 */
function roll(diceFormat, max) {

  var [times, sides, bonus] = diceFormat.split(/d|\+/);

  if (max) {
    return times * sides;
  }

  return _.reduce(
    _.times(times, _.partial(
      _.random, 1, sides, false
    )),
    (total, n) => total + n,
    parseInt(bonus, 10) || 0
  );
}

export default {

  roll,

  roll1d20: function() {
    return roll('1d20');
  }

};
