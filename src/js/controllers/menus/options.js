import m from 'mithril';

import State from '../../vm/state';

export default function() {

  this.state = m.prop(new State());

  this.toggle = function() {
    this.state().toggle(State.ACTIVE);
  }.bind(this);

};
