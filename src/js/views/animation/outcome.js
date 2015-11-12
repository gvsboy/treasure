import m from 'mithril';
import treasureView from './types/treasure';

// Now change it back and continue with the collection process.
/*
Velocity(flipper, {
  backgroundColor: '#123456',
  fill: '#ccc'
}, {
  duration: 200,
  complete: function() {
    opts.boardVM.state('');
    opts.player.takeCard(opts.card);
    m.endComputation();
  }
});
*/



export default function(ctrl, args) {
  // Calculate which view to use. Testing with treasureView right meow.
  return m.component({ view: treasureView }, { player: args.player, boardVM: args.boardVM });
};
