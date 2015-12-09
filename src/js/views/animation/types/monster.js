import m from 'mithril';
import _ from 'lodash';
import Velocity from 'velocity-animate';

import { svg } from '../../../helpers/view';

import barView from '../../bar';

// Bar component.
var bar = {
  view: barView
};

function scroll(el, isInit, context) {
  Velocity(el.lastChild, 'scroll', {
    container: el
  });
}

export default function(ctrl, args) {

  var battle = ctrl.data.battle,
      monster = ctrl.data.monster;

  return m('div', [

    m('div.bar-container', [
      m.component(bar, { type: 'monster', value: monster.health(), max: monster.maxHealth() }),
    ]),

    m('ul.log-battle', { config: scroll }, [
      _.map(battle.log(), message => {
        return m('li.log-item', [
          m('span.log.action', [
            svg(message.icon),
            message.action
          ]),
          m('span.log.result', message.result)
        ]);
      })
    ])
  ]);
}
