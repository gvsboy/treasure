import State from '../../vm/state';

export default function(args) {

  var boardVM = args.boardVM,
      card = args.boardVM().outcomeCard(),
      data = card.activate(args.player());

  function end() {
    boardVM().outcomeCard(null);
    boardVM().state().set(args.player().isDead() ? State.DEAD : State.DEFAULT);
  }

  // If the data is not frozen, unset the outcome card; the round is over.
  if (!data.freeze) {
    end();
  }

  return {
    card,
    data,
    end
  };

};
