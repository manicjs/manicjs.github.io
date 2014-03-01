var mri = angular.module( 'mrisaacs', [] )
    .config( function( $routeProvider ) {
        $routeProvider.when( '/' , {
        templateUrl : 'html/main-article.html',
        controller  : 'MainArticleCtrl'
    });
});

mri.controller('MainArticleCtrl', function( $scope ) {
    $scope.main.title = 'Latest Story';
});