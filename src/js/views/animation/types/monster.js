import m from 'mithril';
import _ from 'lodash';

export default function(ctrl, args) {
  var battle = ctrl.data.battle;
  return m('h3', 'lets battle boo', [
    m('ul', [
      _.map(battle.log(), item => m('li', item))
    ])
  ]);
}
