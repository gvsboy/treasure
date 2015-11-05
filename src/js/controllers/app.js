import Player from '../models/player';
import Card from '../models/card';

export default function(args) {
  this.player = new Player();
  this.cards = Card.get(this.player.floor());
};
