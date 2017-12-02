var mvg = angular.module('mvg');

mvg.controller('HomeController',['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams)
{
  $scope.events = null;

  $http(
  {
          method:'GET',
          url:'/api/events'
  }).then(function(response)
  {
    if(response)
    {
      $scope.events = response.data;
      console.log('received events object from server.');
      //$scope.$apply();
    }else
    {
      console.log('null response from server for events request.');
    }
  });
  console.log('init home controller');

}]);
