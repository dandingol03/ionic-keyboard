/**
 * Created by apple-2 on 16/8/23.
 */
angular.module('app')
  .controller('myController',function($scope,$state,$http){


    $scope.infos=[];

    $http({
       method:'get',
        url:'/proxy/node/insurance/my_pageinfo'
    }).success(function(response) {
      var infos=response.infos;
      if(Object.prototype.toString.call(infos)!='[object Array]')
        infos=JSON.parse(infos);
        $scope.infos=infos;
    }).error(function(err){
      if(err!==undefined&&err!==null)
        console.error(err.toString());
    });


  });
