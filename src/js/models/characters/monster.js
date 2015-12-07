import m from 'mithril';

import Character from './character';

class Monster extends Character {

  constructor(data) {
    super(data);
    this.type = m.prop(data.type);
  }

}

export default Monster;
