import m from 'mithril';
import _ from 'lodash';
import Velocity from 'velocity-animate';
import cardView from './card';

// Maybe this should be moved to the VM ...
function animate(opts, cardEl) {

  // Get a reference to the real card.
  var realCard = document.getElementById(opts.card.id),
      board = document.getElementById('board'),
      flipper = cardEl.querySelector('.flipper');

  // First, let's position the animated card over the real card.
  cardEl.style.top = realCard.offsetTop + 'px';
  cardEl.style.left = realCard.offsetLeft + 'px';

  // Set the board opacity a bit lower to highlight the animated cards.
  board.style.opacity = 0.2;

  // Configure the placement and grow properties. Different lefts for each card.
  var properties = {
    top: (board.offsetTop + ((board.offsetHeight / 2) - (realCard.offsetHeight))) + 'px',
    width: '6em',
    height: '6em'
  };
  if (opts.index === 0) {
    properties.left = (board.offsetLeft + (realCard.offsetWidth / 2)) + 'px';
  }
  else {
    properties.left = (board.offsetLeft + (realCard.offsetWidth * 4.75)) + 'px';
  }

  function revealTreasure() {

    // Determine which outcome will happen while the background color
    // is solid white.

    // Now change it back and continue with the collection process.
    Velocity(flipper, {
      backgroundColor: '#123456',
      fill: '#ccc'
    }, {
      duration: 200
    });

  }

  // Put the cards in their places.
  Velocity(cardEl, properties, {
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
    left: (board.offsetLeft + (realCard.offsetWidth * 2.6)) + 'px'
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
        config: _.partial(animate, { card, index })
      })
    })
  ]);
};
