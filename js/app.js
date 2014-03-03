var mri = angular.module( 'mrisaacs', ['ngRoute'] )
    .config( function( $routeProvider ) {
        $routeProvider.when( '/' , {
            templateUrl : 'html/main-article.html',
            controller  : 'MainArticleCtrl'
        });
});

mri.controller('MainArticleCtrl', function( $scope, $http ) {
    $http.get( 'data/article.json' );
    $scope.main = {
        title : 'Latest Story',
        body  : 'Loren ipsum...',
        info  : 'posted 3 hours ago in...'
    };
});