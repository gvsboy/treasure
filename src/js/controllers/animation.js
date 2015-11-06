import cardsVM from '../vm/cards';

export default function(args) {
  this.cards = args.cards;
  this.cardsVM = cardsVM;
};
