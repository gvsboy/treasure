import m from 'mithril';
import _ from 'lodash';
import Velocity from 'velocity-animate';

import Speed from '../../config/speed';

import State from '../../vm/state';
import { toPx, stack, getTop, getEndingLeft } from '../../helpers/animation';
import matchedView from './matched';
import outcomeView from './outcome';
import deadView from '../dead';

//--------------------------------------------------------------------------------
// animate()

// Maybe this should be moved to the VM ...
function animate(opts, cardEl) {

  // Set initial left placement. Different for each card in the matched pair.
  function getStartingLeft(isFirst) {
    if (isFirst) {
      return toPx(board.offsetLeft + (realCard.offsetWidth / 2));
    }
    return toPx(board.offsetLeft + (realCard.offsetWidth * 4.75));
  }

  // Get a reference to the real card.
  var realCard = document.getElementById(opts.card.id),
      board = document.getElementById('board'),
      flipper = cardEl.querySelector('.flipper');

  // Start a computation.
  m.startComputation();

  // First, let's position the animated card over the real card.
  stack(cardEl, realCard);

  // Put the cards in their initial places.
  Velocity(cardEl, {
    top: getTop(board, realCard),
    left: getStartingLeft(opts.index === 0),
    scale: 1.5
  }, {
    duration: 1000
  });

  // All the while, spin and spin.
  Velocity(cardEl, {
    rotateY: '1440deg'
  }, {
    duration: Speed.spin(),
    easing: 'ease-out',
    queue: false
  });

  // And after a delay, smash them together
  Velocity(cardEl, {
    left: getEndingLeft(board, realCard)
  }, {
    duration: Speed.spin() / 6,
    delay: Speed.spin() / 1.2,
    queue: false,

    // Flash of white and afterwards the outcome will be revealed.
    complete: function() {
      Velocity(flipper, {
        backgroundColor: '#fff'
      }, {
        duration: 200,

        // Set the taken flags to trigger the outcome view.
        complete: function() {
          opts.card.state().set(State.TAKEN);
          m.endComputation();
        }
      });
    }
  });
}

// End crap that needs to go elsewhere
// ----------------------------------------------------------------------------

export default function(ctrl, args) {

  // What content should we put in there?
  var component;

  // Collect all the matched cards. There should be two if any.
  var matchedCards = args.boardVM().getMatchedCards();

  // if there are matched cards, show them and begin that animation.
  if (!_.isEmpty(matchedCards)) {
    component = m.component({ view: matchedView }, { cards: matchedCards, animate });
  }

  // else, if there is an outcome card, reveal that instead!
  else if (args.boardVM().outcomeCard()) {
    component = m.component({ view: outcomeView }, args);
  }

  // Otherwise, if the player is dead then stop the game!
  else if (args.boardVM().state().is(State.DEAD)) {
    component = m.component({ view: deadView }, args);
  }

  return m('div.animations', component);
}
