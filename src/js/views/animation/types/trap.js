import m from 'mithril';
import _ from 'lodash';

function showResults(results) {
  return m('ul',
    _.map(results, (result, key) => m('li', `${result} ${key}`))
  );
}

export default function(ctrl, args) {

  var data = ctrl.data;

  console.log('trap data', data);

  return m('div', [
    m('li', 'Evading'),
    m('div.bar-container', [
      m('div.evade-bar', { 'data-evade': data.evade })
    ]),
    m('div.results', [
      data.isDevastating ? m('div.devastating', 'Devastating!') : null,
      data.results ? showResults(data.results) : m('div.dodged', 'Dodged!')
    ])
  ]);
}
