import m from 'mithril';
import _ from 'lodash';

var LS_KEY = 'bardcard.speed',

    base = {

      // Delay after two cards are selected.
      matching: 1000,

      // Time between executed actions.
      battle: 2000

    };

function Speed(base) {

  var multiplier = window.localStorage.getItem(LS_KEY) || 1.0;
  this.multiplier = m.prop(multiplier);
  this._base = base;

  _.forEach(base, (value, key) => {
    this[key] = m.prop(value * multiplier);
  });
}

Speed.prototype = {

  update: function(multiplier) {

    window.localStorage.setItem(LS_KEY, multiplier);
    this.multiplier(multiplier);

    _.forEach(this._base, (value, key) => {
      this[key](value * multiplier);
    });
  }

};

// We want a global speed config accessible by everyone.
// Is this a good pattern? I'm not sure.
export default new Speed(base);
