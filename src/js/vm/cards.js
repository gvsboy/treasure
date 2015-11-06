import m from 'mithril';
import map from './map';

function CardsVM() {
  this.state = m.prop('');
}

CardsVM.prototype = {

  isMatched: function() {
    return this.state() === 'matched';
  }

};

export default map(CardsVM);
