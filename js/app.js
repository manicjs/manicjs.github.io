var mri = angular.module( 'mrisaacs', ['ngRoute'] )
    .config( function( $routeProvider ) {
        $routeProvider.when( '/' , {
            templateUrl : 'html/main-article.html',
            controller  : 'MainArticleCtrl'
        });
});

mri.controller('MainArticleCtrl', function( $scope, $http ) {
    $http.get( 'data/articles.json' )
    .success( function( data, status, headers, config ) {
        console.log( data );
        console.log( status );
    });

    $scope.main = {
        title : 'Latest Story',
        body  : 'Loren ipsum...',
        info  : 'posted 3 hours ago in...'
    };
});
