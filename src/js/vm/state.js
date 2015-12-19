import m from 'mithril';
import _ from 'lodash';

function State() {
  this._value = m.prop(State.DEFAULT);
}

State.prototype = {

  get: function() {
    return this._value();
  },

  set: function(value) {
    this._value(value);
  },

  is: function(value) {
    return this.get() === value;
  },

  not: function(value) {
    return this.get() !== value;
  },

  isMatchingLocked: function() {
    return _.includes(State.MATCHING_LOCKED, this.get());
  }

};

// All the possible states.
State.DEFAULT = '';

State.TAKEN = 'taken';
State.MATCHING = 'matching';
State.MATCHED = 'matched';
State.BATTLE = 'battle';
State.DEAD = 'dead';

State.SELECTED = 'selected';

// When matching is locked, the user cannot interact with cards on the board.
State.MATCHING_LOCKED = [
  State.MATCHING,
  State.MATCHED,
  State.BATTLE,
  State.DEAD
];

/**
 * Sets the given value to every state item in the given collection.
 * Assumes that the items each have State as the 'state' property.
 * @param {Array} items A collection of objects with 'state' properties.
 * @param {String} state The state value to set.
 * @return {Array} The updated collection.
 */
State.stamp = function(items, state) {
  _.forEach(items, item => item.state().set(state));
};

/**
 * Fetches items from the given collection that match the given state value.
 * Assumes that the items each have State as the 'state' property.
 * @param {Array} items A collection of objects with 'state' properties.
 * @param {String} state The state value to filter by.
 * @return {Array} Items filtered from the collection.
 */
State.filter = function(items, state) {
  return _.filter(items, item => item.state().is(state));
}

export default State;
