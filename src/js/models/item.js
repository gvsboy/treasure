import m from 'mithril';

function Item(data) {
  this.name = m.prop(data.name);
  this.type = m.prop(data.type);
  this.icon = m.prop(data.icon);
}

export default Item;
