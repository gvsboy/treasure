import m from 'mithril';

function State() {
  this._value = m.prop('');
}

State.prototype = {

  get: function() {
    return this._value();
  },

  set: function(value) {
    this._value(value);
  },

  is: function(value) {
    return this._value === value;
  },

  stamp: function(state, items) {
    _.forEach(items, item => item.state(state));
  }

};

State.DEFAULT = '';
State.TAKEN = 'taken';
State.MATCHING = 'matching';
State.MATCHED = 'matched';
State.BATTLE = 'battle';
State.DEAD = 'dead';

export default State;
