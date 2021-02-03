// state of application reactive
const STATE = Vue.observable({
  ready: false,
  iframe: false,
  online: false,
  ismobile: false,
  baseLayerId: null,
  lng: 'en'
});

export default STATE;
