var services = angular.module("PortiaServices", ["ngResource"])

services.factory("common", ["$resource", function($resource) {
  var rest = function(model_name) { 
    var baseUrl = DOMAIN + model_name + "/:id"
    var countUrl = DOMAIN + model_name + "/count/" 
    return $resource(
      baseUrl,
      {id:"@_id.$oid"},
      {
        "count": {method: "GET", url: countUrl}
      }
    )
  }

  var meta = function(model_name) {
    var meta_url = DOMAIN + model_name + "/meta/" 
    return $resource(meta_url)
  }

  return {"rest": rest, "meta": meta}
}])
