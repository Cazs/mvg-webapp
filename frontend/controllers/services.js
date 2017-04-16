//mvg.controller('ServicesController',['$http','$location','$scope','$routeParams',function($scope, $http, $location, $routeParams)
mvg.controller('ServicesController',function($scope)
{
  $scope.liveconcerts = [
                        {'name':'live concert event a','date':0,'venue':'a venue','price':200},
                        {'name':'live concert event b','date':1,'venue':'b venue','price':200},
                        {'name':'live concert event c','date':2,'venue':'c venue','price':200},
                        {'name':'live concert event c','date':2,'venue':'c venue','price':200},
                        {'name':'live concert event c','date':2,'venue':'c venue','price':200}];
    console.log('Init ServicesController.');
});
