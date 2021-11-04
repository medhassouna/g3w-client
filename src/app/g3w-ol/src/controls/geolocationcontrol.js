const InteractionControl = require('./interactioncontrol');
function GeolocationControl() {
  const options = {
    offline: false,
    name: "geolocation",
    tipLabel: "sdk.mapcontrols.geolocation.tooltip",
    label: "\ue904"
  };
  this.initiliazed = false;
  this._layer = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style: new ol.style.Style({
      text: new ol.style.Text({
        text: '\uf3c5',
        font: '900 3em "Font Awesome 5 Free"',
        fill: new ol.style.Fill({
          color: 'red'
        })
      })
    })
  });
  InteractionControl.call(this, options);
}

ol.inherits(GeolocationControl, InteractionControl);

const proto = GeolocationControl.prototype;

/**
 * Method to add market position layer and feature point always on top of map
 * @param map
 * @param coordinates
 * @param show
 * @private
 */
proto._showMarker = function({map, coordinates, show=true}){
  this._layer && this._layer.getSource().clear();
  if (show)  {
    map.getView().setCenter(coordinates);
    const feature = new ol.Feature({
      geometry: new ol.geom.Point(coordinates)
    });
    this._layer.getSource().addFeature(feature);
    map.addLayer(this._layer);
  } else map.removeLayer(this._layer);
};

proto.getMap = function(){
  return InteractionControl.prototype.getMap.call(this);
};

proto.setMap = function(map) {
  InteractionControl.prototype.setMap.call(this, map);

  const geolocation = new ol.Geolocation({
    projection: map.getView().getProjection(),
    tracking: true, // set tracking
    trackingOptions: {
      enableHighAccuracy: true
    }
  });

  geolocation.on('change:position', () => {
    const coordinates = geolocation.getPosition();
    if (coordinates) {
      if (!this.initiliazed) {
        $(this.element).removeClass('g3w-ol-disabled');
        this.initiliazed = true;
      }
      this._showMarker({
        map,
        coordinates,
        show: this.isToggled()
      })
    } else {
      this.initiliazed = true;
      this.hideControl();
    }
  });

  geolocation.once('error', evt => {
    this.hideControl();
    this._layer = null;
    evt.code !== 1 && this.dispatchEvent('error');
  });

  this.on('toggled', () => {
    const coordinates = geolocation.getPosition();
    this._showMarker({
      map,
      coordinates,
      show: this.isToggled()
    })
  });
};

module.exports = GeolocationControl;
