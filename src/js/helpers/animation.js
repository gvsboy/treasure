import _ from 'lodash';
import Velocity from 'velocity-animate';

var PX = 'px';

function dimensionPropertyGetterSetter(prop, el, value) {
  if (value) {
    el.style[prop] = toPx(value);
  }
  return el[`offset${_.capitalize(prop)}`];
}

export var width = _.partial(dimensionPropertyGetterSetter, 'width');
export var height = _.partial(dimensionPropertyGetterSetter, 'height');
export var top = _.partial(dimensionPropertyGetterSetter, 'top');
export var left = _.partial(dimensionPropertyGetterSetter, 'left');

export function toPx(value) {
  return value + PX;
}

// Place one element directly over the other.
export function stack(topEl, bottomEl) {
  top(topEl, top(bottomEl));
  left(topEl, left(bottomEl));
}

export function under(underEl, overEl) {
  top(underEl, top(overEl) + height(overEl));

}

// Retrieves the correct starting top property value based on the board and card.
export function getTop(board, card) {
  return toPx(top(board) + ((height(board) / 2) - height(card)));
}

export function getEndingLeft(board, card) {
  return toPx(left(board) + (width(card) * 2.6));
}

