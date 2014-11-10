var app = angular.module("PortiaApp", ["PortiaTags", "PortiaServices", "Product", "ui.router"])

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/client_manage")
  $urlRouterProvider.when('/product_manage', '/product_manage/product_list')

	$stateProvider
    // product keyword manage
    .state('product_keyword', {
      url: '/product_keyword',
      templateUrl: 'manage-content.html',
      controller: function($scope) {
        $scope.menus = [
          {id:'keyword_manage', name:'关键字管理', model:'keywords'}
        ]
      }
    })
		// client manage content
		.state('client_manage', {
      url: "/client_manage",
      templateUrl: "manage-content.html",
      controller: function($scope) {
			  $scope.menus = [
			    {id:"client_info", name:"客户信息", model:"customers"},
			    {id:"ali_account_info", name:"阿里帐户", model:"accounts"}
			  ]
      }
    })

		// product manage content
    .state('product_manage', {
      url: "/product_manage",
      templateUrl: "product-manage-content.html",
      controller: function($scope) {
			  $scope.menus = [
          {id:"product_list", name:"产品列表", model:"products"},
			    {id:"product_template", name:"产品模板", model:"products"}
			  ]

        $scope.current = 0

        $scope.is_current = function(index) {
          return $scope.current == index
        }

        $scope.set_current = function(index) {
          $scope.current = index
        }
      }
    })

    // product list
    .state('product_manage.product_list', {
      url: "/product_list",
      templateUrl: "product-list.html",
      controller: 'ProductListCtrl'
    })

    // product template
    .state('product_manage.product_template', {
      url: "/product_template",
      templateUrl: "product-template.html"
    })

})

app.controller("NavCtrl", ["$scope", "common", function($scope, common) {
  $scope.navs = [
    {title:"客户管理", id:"client_manage"},
    {title:"产品管理", id:"product_manage"},
    {title:"产品关键字", id:"product_keyword"}
  ]

  $scope.current = 0

  $scope.is_current = function(index) {
    return $scope.current == index
  }

  $scope.set_current = function(index) {
    $scope.current = index
  }
}])
