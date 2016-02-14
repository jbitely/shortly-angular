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
      $scope.linkForm.$setPristine();
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
})
.directive('validateUrl', function () {
  return function (scope, el, attr) {

    urlRegex = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;
    console.log('regex: ', urlRegex);
    console.log('regex: ', typeof urlRegex);
    el.on('keyup', function () {

      if (!el.val() || urlRegex.test(el.val())) {
        el.removeClass('error');
      } else {
        el.addClass('error');
      }
    });
  }
});
