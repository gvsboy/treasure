import m from 'mithril';
import _ from 'lodash';
import Velocity from 'velocity-animate';
import cardView from '../card';
import { svg } from '../../helpers/view';

//--------------------------------------------------------------------------------
// All this crap needs to go somewhere else!!!

var PX = 'px';

function toPx(value) {
  return value + PX;
}

// Place one element directly over the other.
function stack(topEl, bottomEl) {
  topEl.style.top = toPx(bottomEl.offsetTop);
  topEl.style.left = toPx(bottomEl.offsetLeft);
}

// Retrieves the correct top property value based on the board and card.
function getTop(board, card) {
  return toPx(board.offsetTop + ((board.offsetHeight / 2) - (card.offsetHeight)));
}

function getEndingLeft(board, card) {
  return toPx(board.offsetLeft + (card.offsetWidth * 2.6));
}

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

  // Determine which outcome will happen while the background color
  // is solid white.
  function revealTreasure() {

    opts.cardVM.state('taken');
    m.endComputation();

    // Now change it back and continue with the collection process.
    /*
    Velocity(flipper, {
      backgroundColor: '#123456',
      fill: '#ccc'
    }, {
      duration: 200,
      complete: function() {
        opts.cardVM.state('taken');
        opts.boardVM.state('');
        opts.player.takeCard(opts.card);
        m.endComputation();
      }
    });
    */
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
    duration: 3000,
    easing: 'ease-out',
    queue: false
  });

  // And after a delay, smash them together
  Velocity(cardEl, {
    left: getEndingLeft(board, realCard)
  }, {
    duration: 600,
    delay: 2600,
    queue: false,
    complete: function() {
      Velocity(flipper, {
        backgroundColor: '#fff'
      }, {
        duration: 200,
        complete: revealTreasure
      });
    }
  });
}

//--------------------------------------------------------------------------------
// animateOutcome()
function animateOutcome(opts, cardEl) {
  var outcomeCard = opts.boardVM.outcomeCard();

  var board = document.getElementById('board');

  cardEl.style.top = getTop(board, cardEl);
  cardEl.style.left = getEndingLeft(board, cardEl);
}

// End crap that needs to go elsewhere
// ----------------------------------------------------------------------------

var cardComponent = {
  view: cardView
};

export default function(ctrl, args) {

  // What content should we put in there?
  var content;

  // Collect all the matched cards. There should be two if any.
  var matchedCards = _.filter(ctrl.cards, card => ctrl.cardsVM(card.id).isMatched());

  // if there are matched cards, show them and begin that animation.
  if (!_.isEmpty(matchedCards)) {
    content = _.map(matchedCards, (card, index) => {
      return m.component(cardComponent, {
        id: 'animate-' + card.id,
        class: 'matched',
        front: card.icon(),
        back: card.icon(),
        config: _.partial(animate, {
          card,
          index,
          player: args.player,
          cardVM: ctrl.cardsVM(card.id),
          boardVM: args.boardVM
        })
      })
    });
  }

  // else, if there is an outcome card, reveal that instead!
  else if (args.boardVM.outcomeCard()) {
    content = m('div.card.outcome', { config: _.partial(animateOutcome, {
      player: args.player,
      boardVM: args.boardVM
    })}, [
      svg(args.boardVM.outcomeCard().icon())
    ]);
  }

  return m('div.animations', [
    content
  ]);
};
