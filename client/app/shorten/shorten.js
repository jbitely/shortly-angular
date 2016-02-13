angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links, $http, $timeout) {
  // Your code here
  $scope.link = {
    url: ''
  }; // may need refactor for actual solution

  $scope.waiting = false;
  $scope.message = '';

  $scope.addLink = function () {
    $scope.waiting = true;
    $http({
      method: 'POST',
      url: '/api/links',
      data: JSON.stringify($scope.link)
    }).then(function(){
      $scope.message = "Link shortened";
    }).catch(function(){
      $scope.message = "We encountered an error!"
    }).finally(function() {
      $timeout(function() {
        $scope.message = "";
      }, 3000);
      $scope.link.url = '';
      $scope.waiting = false;
    })
  };
});
