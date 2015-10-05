import m from 'mithril';
import _ from 'lodash';
import Data from './data';

class Card {

  constructor(data) {
    this.name = m.prop(data.name);
    this.type = m.prop(data.type);
    this.icon = m.prop(data.icon);
    this.pickedUp = m.prop(false);
  }

}

Card.get = function(floor) {
  var floorData = Data.floors[floor - 1];
  var cards = Data.cards.map(function(cardData) {
    return new Card(cardData);
  });
  return _.shuffle(cards);
};

function svg(name) {
  return m('svg',
    m('use[href="#' + name + '"]')
  );
}

function BoardView(ctrl) {
  return m('ul', {id: 'cards'}, [
    ctrl.cards.map(function(card) {
      return m('li', {class: 'card', onclick: ctrl.select.bind(ctrl)},
        m('div', {class: 'flipper'}, [
          m('div', {class: 'front'},
            svg('clover-spiked')
          ),
          m('div', {class: 'back'},
            svg(card.icon())
          )
        ])
      );
    })
  ]);
}

function BoardController() {

  var previousCard;

  function getCardIndex(card) {
    var cards = document.getElementById('cards').children;
    return _.indexOf(cards, card);
  }

  function getCard(el) {
    return el.closest('.card');
  }

  this.cards = Card.get(1);

  this.select = function(evt) {

    var cardEl = getCard(evt.target),
        card = this.cards[getCardIndex(cardEl)];

    cardEl.classList.add('selected');

    if (previousCard) {
      if (previousCard !== card) {
        console.log(previousCard.type === card.type);
      }
    }
    else {
      previousCard = card;
    }
  };

};

var Board = {
  controller: BoardController,
  view: BoardView
};

m.mount(document.getElementById('app'), Board);
