import m from 'mithril';

function resize(element, isInit, context) {
  var width = (this.value() / this.max()) * 100;
  element.style.width = width + '%';
}

export default function(ctrl) {
  return m('span.bar', { class: ctrl.type, config: resize.bind(ctrl) });
};
