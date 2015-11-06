import _ from 'lodash';

export default function(model) {
  var map = {};
  return function(key) {
    if (!map[key]) {
      map[key] = new model();
    }
    return map[key];
  }
};
