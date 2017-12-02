var mvg = angular.module('mvg',['ngRoute']);

mvg.config(function($routeProvider)
{
  $routeProvider.when('/',{redirectTo:'/index'})
  .when('/index',
  {
    controller:'HomeController',
    templateUrl:'views/home.html'
  })
  .when('/contact',
  {
    controller:'ContactController',
    templateUrl:'views/contact.html'
  })
  .when('/services',
  {
    controller:'ServicesController',
    templateUrl:'views/services.html'
  }).when('/downloads', 
  {
    controller: 'DownloadsController',
    templateUrl:'views/downloads.html'
  })
  .when('/about',
  {
    //controller:'AboutController',
    templateUrl:'views/about.html'
  }).otherwise({redirectTo:'/'})
});
