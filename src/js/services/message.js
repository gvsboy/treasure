import _ from 'lodash';

import Dictionary from '../config/dictionary';

var BATTLE_DICTIONARY = Dictionary.battle.use;

function Message(data) {
  this.action = `${data.character.name()} ${this._getActionVerb(data)}!`;
  this.result = this._getResult(data);
  this.icon = this._getIcon(data);
}

Message.prototype = {

  _getActionVerb: function(data) {

    var item = data.item;

    if (item) {
      if (item.type() === 'magic') {
        return BATTLE_DICTIONARY[item.mechanics().type];
      }
      else {
        return BATTLE_DICTIONARY[item.type()];
      }
    }
    return 'attacks';
  },

  _getResult: function(data) {
    if (_.isUndefined(data.damage)) {
      return '';
    }
    return data.damage > 0 ? `${data.damage} damage` : 'Miss!';
  },

  _getIcon: function(data) {
    if (data.item) {
      return data.item.icon();
    }
    return data.character.weaponIcon();
  }

};

export default Message;
