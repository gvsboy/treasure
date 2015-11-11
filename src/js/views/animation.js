import m from 'mithril';
import _ from 'lodash';
import Velocity from 'velocity-animate';
import cardView from './card';

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



// Maybe this should be moved to the VM ...
function animate(opts, cardEl) {

  // Retrieves the correct top property value based on the board.
  function getTop() {
    return toPx(board.offsetTop + ((board.offsetHeight / 2) - (realCard.offsetHeight)));
  }

  // Set initial left placement. Different for each card in the matched pair.
  function getStartingLeft(isFirst) {
    if (isFirst) {
      return toPx(board.offsetLeft + (realCard.offsetWidth / 2));
    }
    return toPx(board.offsetLeft + (realCard.offsetWidth * 4.75));
  }

  function getEndingLeft() {
    return toPx(board.offsetLeft + (realCard.offsetWidth * 2.6));
  }

  // Determine which outcome will happen while the background color
  // is solid white.
  function revealTreasure() {

    // Now change it back and continue with the collection process.
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
    top: getTop(),
    left: getStartingLeft(opts.index === 0),
    width: '6em',
    height: '6em'
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
    left: getEndingLeft()
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

// End crap that needs to go elsewhere
// ----------------------------------------------------------------------------

var cardComponent = {
  view: cardView
};

export default function(ctrl, args) {

  // Collect all the matched cards. There should be two.
  var cards = _.filter(ctrl.cards, card => ctrl.cardsVM(card.id).isMatched());

  return m('div.animations', [
    _.map(cards, (card, index) => {
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
    })
  ]);
};
