export default function(args) {

  var card = args.boardVM.outcomeCard(),
      data = card.activate(args.player);

  // Unset the outcome card; the round is over.
  args.boardVM.outcomeCard(null);
  args.boardVM.state('');

  return { card, data };
};
