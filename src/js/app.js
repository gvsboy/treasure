import m from 'mithril';
import _ from 'lodash';
import Data from './data';

class Card {

  constructor(data) {
    this.name = m.prop(data.name);
    this.type = m.prop(data.type);
    this.icon = m.prop(data.icon);
    this.selected = m.prop(false);
    this.matched = m.prop(false);
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
  return m('ul#cards', {onclick: ctrl.select.bind(ctrl)}, [
    ctrl.cards.map(function(card) {
      return m('li.card' + (card.selected() ? '.selected' : ''),
        m('div.flipper', [
          m('div.front',
            svg('clover-spiked')
          ),
          m('div.back',
            svg(card.icon())
          )
        ])
      );
    })
  ]);
}

function BoardController() {

  var previousCard;

  function getCardByDOMReference(el) {
    var card = el.closest('.card'),
        index = _.indexOf(document.getElementById('cards').children, card);
    return this.cards[index];
  }

  this.cards = Card.get(1);

  this.select = function(evt) {

    var card = getCardByDOMReference.call(this, evt.target);
    card.selected(true);

    if (previousCard) {
      if (previousCard !== card) {
        console.log(previousCard.type() === card.type());
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
