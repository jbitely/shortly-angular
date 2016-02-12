angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links, $http) {
  // Your code here
  $scope.link = {}; // may need refactor for actual solution

  $scope.addLink = function () {
    $http({
      method: 'POST',
      url: '/api/links',
      data: JSON.stringify($scope.link)
    })
  };

});
