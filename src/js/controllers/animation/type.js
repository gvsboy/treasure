import STATES from '../../config/states';

export default function(args) {

  var boardVM = args.boardVM,
      card = args.boardVM().outcomeCard(),
      data = card.activate(args.player());

  function end() {
    boardVM().outcomeCard(null);
    boardVM().state(args.player().isDead() ? STATES.DEAD : '');
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
