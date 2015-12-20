import m from 'mithril';
import _ from 'lodash';

import Dictionary from '../config/dictionary';

var BATTLE_DICTIONARY = Dictionary.battle.use;

function Message(data) {
  this.action = `${data.character.name()} ${this._getActionVerb(data)}!`;
  this.result = data.damage > 0 ? `${data.damage} damage` : 'Miss!';
  this.icon = this._getIcon(data);
}

Message.prototype = {

  _getActionVerb: function(data) {
    if (data.item) {
      return BATTLE_DICTIONARY[data.item.mechanics().type];
    }
    return 'attacks';
  },

  _getIcon: function(data) {
    if (data.item) {
      return data.item.icon();
    }
    return data.character.weaponIcon();
  }

};

export default Message;
