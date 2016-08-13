var inherit = require('core/utils/utils').inherit;
var GUI = require('gui/gui');
var G3WObject = require('core/g3wobject');
var ProjectsRegistry = require('core/project/projectsregistry');

function QueryResultsService(){
  var self = this;
  this.init = function(options) {
    this.clearState()
  };
  
  this.state = {
    layers: [],
    query: {},
    querytitle: "",
    loading: true
  };
  
  this.clearState = function() {
    this.state = {
      layers: [],
      query: {},
      querytitle: "",
      loading: true
    };
  };
  
  this.setQueryResponse = function(queryResponse) {
    this.state.layers = [];
    this.state.query = queryResponse.query;
    this.digestFeaturesForLayers(queryResponse.data);
    this.state.loading = false;
  };
  
  this.setTitle = function(querytitle) {
    this.state.querytitle = querytitle || "";
  };
  
  this.reset = function() {
    this.clearState();
  };
  
  this.digestFeaturesForLayers = function(featuresForLayers) {
    var self = this;
    _.forEach(featuresForLayers,function(featuresForLayer){
      var layer = featuresForLayer.layer;
      var layerObj = {
        title: layer.title,
        id: layer.id,
        attributes: layer.attributes,
        features: []
      };
      _.forEach(featuresForLayer.features,function(feature){      
        var featureObj = {
          id: feature.getId(),
          attributes: feature.getProperties(),
          geometry: feature.getGeometry()
        }
        layerObj.features.push(featureObj);
      })
      self.state.layers.push(layerObj);
    })
  }
};

// Make the public service en Event Emitter
inherit(QueryResultsService, G3WObject);

module.exports = QueryResultsService;
