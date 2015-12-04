import m from 'mithril';
import _ from 'lodash';
import Velocity from 'velocity-animate';

import DOM from '../config/dom';

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

export function flash(el, color) {
  Velocity(el, {
    backgroundColor: color || '#fff'
  }, {
    duration: 200
  });
  Velocity(el, 'reverse');
}

/**
 * [leapTo description]
 * @param  {Object} el [description]
 * @param  {Object} opts [description]
 * @param  {Object} opts.el [description]
 * @param  {Object} opts.top [description]
 * @param  {Object} opts.left [description]
 * @param  {Object} opts.callback [description]
 */
export function leapTo(el, opts) {
  Velocity(el, {
    top: opts.top,
    left: opts.left,
    scale: [ 0, 1.5 ]
  }, {
    delay: 1500,
    duration: 1000
  })
  .then(opts.callback);
}

export function getAndRevealCardAndInfo(el, freeze) {

  // Get references to all the objects we need.
  var board = document.getElementById(DOM.ID.BOARD),
      card = el.querySelector(DOM.CLASS.CARD),
      info = el.querySelector(DOM.CLASS.INFO);

  // Center the card.
  card.style.top = getTop(board, card);
  card.style.left = getEndingLeft(board, card);

  // Place the info panel under the card.
  under(info, card);
  left(info, left(board));
  width(info, width(board));

  // Slide the info panel into view.
  info.style.display = 'none';
  Velocity(info, 'slideDown');

  // And slide up the info panel to hide it.
  if (!freeze) {
    Velocity(info, 'slideUp', {
      delay: 1000
    });
  }

  return { card, info };
}

// Currently for items only, but this boilerplate would work for other types too!!
export function revealToInventory(el, isInit, context) {

  // Reference the inventory list, show the card and information.
  var inventory = document.getElementById(DOM.ID.INVENTORY),
      card = getAndRevealCardAndInfo(el).card;

  // Now, move the card to the end of the inventory list.
  leapTo(card, {
    top: top(inventory) + height(inventory),
    left: left(inventory),
    callback: m.redraw
  });
}

export function revealToGold(el, isInit, context) {

  // Reference the gold status, show the card and information.
  var goldStatus = document.getElementById(DOM.ID.GOLD_STATUS),
      card = getAndRevealCardAndInfo(el).card;

  // Now, move the card to the end of the energy bar.
  leapTo(card, {
    top: top(goldStatus),
    left: left(goldStatus),
    callback: m.redraw
  });
}

export function revealToEnergyBar(el, isInit, context) {

  // Reference the energy bar, show the card and information.
  var energyBar = document.querySelector(DOM.CLASS.ENERGY_BAR),
      card = getAndRevealCardAndInfo(el).card;

  // Now, move the card to the end of the energy bar.
  leapTo(card, {
    top: top(energyBar),
    left: left(energyBar) + width(energyBar),
    callback: m.redraw
  });
}

export function trapAnimation(el, isInit, context) {

  var card = getAndRevealCardAndInfo(el, true).card,
      info = el.querySelector(DOM.CLASS.INFO),
      bar = el.querySelector(DOM.CLASS.EVADE_BAR),
      results = el.querySelector(DOM.CLASS.RESULTS),

      // At least grow the bar to a noticeable width (at least 25%).
      evade = Math.max(parseInt(bar.getAttribute('data-evade'), 10), 25),

      // Fill the bar up at a similar speed regardless of the final width.
      // 1000ms is for 100%.
      barDuration = (evade / 100) * 1000;

  // Start the bar at 0 and let the growing begin!
  bar.style.width = 0;

  Velocity(bar, {
    width: evade + '%'
  }, {
    duration: barDuration,
    delay: 500,
    complete: function() {
      Velocity(results, 'slideDown');
      if (evade === 100) {
        flash(bar);
      }
      Velocity(info, 'slideUp', {
        delay: 1500,
        complete: m.redraw
      });
    }
  });

}

// THESE HAVE SHITTY NAMES===

// Retrieves the correct starting top property value based on the board and card.
export function getTop(board, card) {
  return toPx(top(board) + ((height(board) / 2) - height(card)));
}

export function getEndingLeft(board, card) {
  return toPx(left(board) + (width(card) * 2.6));
}

export default {
  width,
  height,
  top,
  left,
  toPx,
  stack,
  under,
  flash,
  leapTo,
  getTop,
  getEndingLeft,
  getAndRevealCardAndInfo
}
