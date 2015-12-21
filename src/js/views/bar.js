import m from 'mithril';

function resize(element, isInit, context) {
  var width = (this.value / this.max) * 100;
  element.style.width = width + '%';
}

export default function(ctrl, args) {
  return m('div.bar-container', { class: args.type }, [
    m('span.bar', { class: args.type, config: resize.bind(args) })
  ]);
};
