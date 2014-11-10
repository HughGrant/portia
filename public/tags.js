var tags = angular.module("PortiaTags", ["PortiaServices"])

tags.filter('field_value', function() {
  return function(records, field, value, metas) {
    var fields = [field]
    if ((value == undefined) && (field == undefined)) {
      return records
    }

    if ((value == undefined) && (field != undefined)) {
      return records
    }

    if ((value != undefined) && (field == undefined)) {
      fields = []
      for (var i = metas.length - 1; i >= 0; i--) {
        fields.push(metas[i].name)
      }
    }

    value = value.toString().toLowerCase()
    var result = []
    for (var i = records.length - 1; i >= 0; i--) {
      for (var j = fields.length - 1; j >= 0; j--) {
        var fv = records[i][fields[j]]
        if (fv == undefined || fv == '') {
          continue
        }
        if (fv.toString().toLowerCase().indexOf(value) != -1) {
            result.push(records[i])
            break
        }
      }
    }
    return result
  }
})

tags.directive('portiaPagination', function() {
  return {
    restrict: 'E',
    require: '^portiaGrid',
    replace: true,
    scope: {
      'row': '=',
      'limit': '=',
      'current': '='
    },
    templateUrl: 'pagination.html',
    controller: ['$scope', function($scope) {
      $scope.$watch('row', function(nv, ov) {
        if (nv) {
          $scope.paginate()
        }
      })

      $scope.paginate = function() {
        var pages = []
        page = Math.ceil($scope.row / $scope.limit)
        for (var i = 0; i < page; i++) {
          pages.push(i)
        }
        $scope.page = page
        $scope.pages = pages
        $scope.current = 0
        $scope.disable_button()
      }

      $scope.$watch('limit', function(nv, ov) {
        $scope.paginate()
      })

      $scope.disable_button = function() {
        if ($scope.current == 0) {
          $scope.previous_disabled = true
        } else {
          $scope.previous_disabled = false
        }

        if (($scope.current + 1) == $scope.page) {
          $scope.next_disabled = true
        } else {
          $scope.next_disabled = false
        }
      }

      $scope.next = function() {
        if ($scope.current < $scope.page && !$scope.next_disabled) {
          $scope.current += 1
          $scope.disable_button()
        }
      }

      $scope.previous = function() {
        if ($scope.current > 0 && !$scope.previous_disabled) {
          $scope.current -= 1
          $scope.disable_button()
        }
      }

      $scope.set_current = function (index) {
        $scope.current = index
        $scope.disable_button()
      }

      $scope.is_current = function (index) {
        return index == $scope.current
      }
    }]
  }
})

tags.directive('portiaForm', function() {
  return {
    restrict: "E",
    require: '^portiaGrid',
    replace: true,
    scope: {
      "model_name": '@modelName',
      'record': '=',
      'metas': '='
    },
    templateUrl: 'form.html',
    controller: ["$scope", function($scope) {
      $scope.title = $scope.record._id ? "新建" : "修改"

      $scope.save = function() {
        if (!$scope.record._id) {
          $scope.$parent.records.push($scope.record)
        }
        $scope.record.$save(function(data) {
          $scope.record.check = false
        })
        $scope.$parent.toggle()
      }
    }]
  }
})

tags.directive('portiaProduct', function() {
  return {
    restrict: "E",
    require: '^portiaGrid',
    replace: true,
    scope: {
      'record': '=',
      'metas': '='
    },
    templateUrl: 'product-edit.html',
    controller: ["$scope", function($scope) {
      $scope.title = function(name) {
        for (var i = 0; i < $scope.metas.length; i++) {
          if ($scope.metas[i].name == name) {
            return $scope.metas[i].title
          }
        }
        return 'undefined'
      }

      $scope.save = function() {
        $scope.record.$save(function(data) {
          $scope.record.check = false
          $scope.record._id = data._id.$oid
        })
        $scope.$parent.toggle()
      }
    }]
  }
})


tags.directive('portiaGrid', function() {
  return {
    restrict: "E",
    replace: true,
    scope: {
      "model_name": '@modelName'
    },
    controller: ["$scope", "$filter", "common", function($scope, $filter, common) {
      // inital setting
      $scope.check = false
      // toggling form
      $scope.toggle = function() {
        $('#' + $scope.model_name + "Modal").modal("toggle")
      }
      // first get titles
      $scope.metas = common.meta($scope.model_name).query()

      // list first page data
      var model = common.rest($scope.model_name)
      $scope.model = model
      $scope.temp = new model()

      $scope.query = function(limit, page) {
        model.query({limit: limit, page: page}, function(records) {
          angular.forEach(records, function(object) {
            object.check = false
          })
          $scope.records = records
        })
      }

      // select all check box
      $scope.check_all = function() {
        $scope.check = !$scope.check
        angular.forEach($scope.records, function(object, index) {
          object.check = $scope.check
        })
      }

      // delete selected
      $scope.delete_checked = function() {
        if ($scope.check) {
          var flag = window.confirm("危险: 您确定要删除全选的数据吗?")
          if (!flag) {
            return false;
          }
        }

        var filtered = $filter("filter")($scope.records, {check:false})

        angular.forEach($scope.records, function(record, index) {
          if (record.check === true) {
            record.$remove()
          }
        })

        $scope.records = filtered;
        if ($scope.check) {
          $scope.check = false
        }
      }

      // create a row
      $scope.create_row = function() {
        $scope.temp = new model()
        $scope.toggle()
      }
      // edit a row
      $scope.edit_row = function(record) {
        $scope.temp = record
        $scope.toggle()
      }

      // pagination
      $scope.limit = 30
      $scope.current = 0

      $scope.query($scope.limit, $scope.current)

      $scope.$watch('limit', function(limit, old) {
        if (limit != old) {
          $scope.query($scope.limit, $scope.current)
        }
      })

      $scope.$watch('current', function(current, old) {
        if (current != old) {
          $scope.query($scope.limit, $scope.current)
        }
      })

      model.count(function(data) {
        $scope.row = data.row
      })

    }],
    templateUrl: "grid.html"
  };
});

tags.directive("portiaTd", function() {
  return {
    restrict: 'E',
    replace: true,
    require: '^portiaGrid',
    scope: {
      object: '=',
      field: '@'
    },
    controller: function($scope) {
      $scope.input = {show: false};
      $scope.initalValue = $scope.object[$scope.field]
    },
    link: function(scope, elem, attrs) {
      var input = elem.find('input');
      var td = elem.parent("td");

      input.bind("blur", function() {
        scope.input.show = !scope.input.show;
        scope.$apply();
        if (scope.object[scope.field] != scope.initalValue) {
          var data = {};
          data[scope.field] = scope.object[scope.field];
          scope.$parent.model.update({id:scope.object.id}, data);
        }
      });

      td.bind('dblclick', function() {
        scope.input.show = !scope.input.show;
        scope.$apply();
        input.focus();
        input.select();
      });
    },
    templateUrl: "td.html"
  }
});
