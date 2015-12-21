import m from 'mithril';

import Speed from '../../config/speed';

import State from '../../vm/state';

export default function() {

  this.state = m.prop(new State());

  this.toggle = function() {
    this.state().toggle(State.ACTIVE);
  }.bind(this);

  this.update = function(value) {
    Speed.update(value);
  };

  this.getSpeed = function() {
    return Speed.multiplier();
  };

};
