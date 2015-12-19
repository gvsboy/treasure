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
    return this._value() === value;
  },

  isMatchingLocked: function() {
    return _.includes(State.MATCHING_LOCKED, this.get());
  }

};

State.DEFAULT = '';
State.TAKEN = 'taken';
State.MATCHING = 'matching';
State.MATCHED = 'matched';
State.BATTLE = 'battle';
State.DEAD = 'dead';

State.MATCHING_LOCKED = [
  State.MATCHING,
  State.MATCHED,
  State.BATTLE,
  State.DEAD
];

State.stamp = function(items, state) {
  _.forEach(items, item => item.state().set(state));
};

State.filter = function(items, state) {
  return _.filter(items, item => item.state().is(state));
}

export default State;
