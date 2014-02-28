var mri = angular.module( 'mrisaacs', [] )
  .config( function( $routeProvider, $locationProvider, $interpolateProvider ) {
    $routeProvider.when( '/' , {
      templateUrl : 'views/',
      controller  : 'AppCtrl'
    });
  });
