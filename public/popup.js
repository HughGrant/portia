var aliUrl = "https://login.alibaba.com/"
var product_display_url = "www.alibaba.com/product-detail"

var app = angular.module("PortiaPopup", ["PortiaServices"]);

app.controller("buttonController", ["$scope", "common", function($scope, common) {

  $scope.option = function() {
    chrome.tabs.create({url:"options.html"}); 
  }

}])
