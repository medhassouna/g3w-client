const Input = require('gui/inputs/input');

const RangeInput = Vue.extend({
  mixins: [Input],
  template: require('./sliderrange.html'),
  watch: {
    'state.input.options.min': function () {
      this.service.changeInfoMessage();
    },
    'state.input.options.max': function () {
      this.service.changeInfoMessage();
    },
  },
});

module.exports = RangeInput;
