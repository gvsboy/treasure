import Player from '../models/player';
import Card from '../models/card';
import BoardVM from '../vm/board';

export default function(args) {
  this.player = new Player();
  this.cards = Card.get(this.player.floor());
  this.boardVM = new BoardVM();
};
