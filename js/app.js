var mri = angular.module( 'mrisaacs', ['ngRoute'] )
    .config( function( $routeProvider ) {
        $routeProvider.when( '/' , {
            templateUrl : 'html/main-article.html',
            controller  : 'MainArticleCtrl'
        });
});

mri.controller('MainArticleCtrl', function( $scope, $http ) {
    $http.get( 'data/articles.json' )
    .success( function( response, status, headers, config ) {
        $scope.main = {
            title : response.title
            body  : response. body
        }
    });
});
