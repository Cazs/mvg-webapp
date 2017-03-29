mvg.controller('EventsController',['$location','$http','$routeParams','$scope',function($location,$http,$routeParams,$scope)
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
    }else
    {
      console.log('null response from server for events request.');
    }
  });

  console.log('init EventsController');
}]);
