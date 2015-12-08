import m from 'mithril';
import _ from 'lodash';

import barView from '../../bar';

// Bar component.
var bar = {
  view: barView
};

export default function(ctrl, args) {
  var battle = ctrl.data.battle,
      monster = ctrl.data.monster;
  console.log(monster.health());
  return m('div', [
    m('div.bar-container', [
      m.component(bar, { type: 'monster', value: monster.health(), max: monster.maxHealth() }),
    ]),
    m('ul', [
      _.map(battle.log(), item => m('li', item))
    ])
  ]);
}
