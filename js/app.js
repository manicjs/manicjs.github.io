var mri = angular.module( 'mrisaacs', [] )
  .config( function( ) {
 //   $routeProvider.when( '/' , {
 //     templateUrl : 'html/',
 //     controller  : 'Ctrl'
 //   });
  });

mri.controller('MainArticleCtrl', function( $scope ) {
    $scope.main.title = 'Latest Story';
});