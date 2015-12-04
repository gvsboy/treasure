export default function(args) {

  var card = args.boardVM.outcomeCard(),
      data = card.activate(args.player);

  // If the data is not frozen, unset the outcome card; the round is over.
  if (!data.freeze) {
    args.boardVM.outcomeCard(null);
    args.boardVM.state('');
  }

  return { card, data };
};
