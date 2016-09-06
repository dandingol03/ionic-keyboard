angular.module('app')
  .controller('motorInsuranceController',function($scope,$state,$http,$ionicActionSheet,$ionicHistory,$ionicModal,$location,$rootScope){


    $scope.coverages=[];//车险险种项目
    $scope.coverage={}
    $scope.selected=[];//被选中的险种



    $scope.car_insurance= {};//一条车险订单

    $scope.apply=function () {//选好险种提交时做的动作

      $scope.car_insurance.state='pricing';//状态是估价中订单

      $rootScope. car_insurance=$scope.car_insurance;


      $scope.coverages.map(function (coverages, i) {
        if($scope.coverage.flag==true){
          $scope.selected.push(coverage);
        }
      });

      //TODO:push selected to back-end
      //TODO:receive the shemes from back-end


      $state.go('motor_plan',{plan:[]});//跳到车险方案列表页面,并传递选中的险种和相应保额作为参数。

    }

    $scope.goto=function(url) {
      $location.path(url);
    }

    $scope.projects={};
    $scope.projects.selected=[];

    $scope.projects_take_part={};

    $scope.go_back=function(){
      window.history.back();
    }

    $http({
      method:"get",
      url:"/proxy/node/insurance/project_provide"
    }).success(function(response){
      var projects=response.projects;
      if(Object.prototype.toString.call(projects)!='[object Array]')
        projects=JSON.parse(projects);

      $scope.coverages=projects;//从测试服务器取到险种列表,付给coverages数组。

    }).error(function(err){
      if(err!==undefined&&err!==null)
        console.error(err.toString());
    });

    $scope.fee_change=function () {
        var coverages=$scope.coverages;
        console.log('...');
    }


    //flag==true代表选中的
    $scope.project_select=function(proj) {
      var coverages=$scope.coverages;
      console.log('...');






    }

    $scope.upload_proj=function(){
      $http({
        method:"post",
        url:"/proxy/node/insurance/project_upload",
        params:{
          proj_list:$scope.projects_take_part
        }
      }).success(function(response){
        var prices=response.prices;
        if(prices!==undefined&&prices!==null)
        {
          $state.go('tabs.price',{data:prices});
        }else{}

      }).error(function(err){
        console.error(err.toString());
      });
    }


    $scope.actionSheet_show = function() {

      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: '<b>Share</b> This' },
          { text: '<b>Share</b> This' },
          { text: '<b>Share</b> This' },
          { text: '<b>Share</b> This' },
          { text: '<b>Share</b> This' },
          { text: '<b>Share</b> This' },
          { text: '<b>Share</b> This' },
          { text: '<b>Share</b> This' },
          { text: '<b>Share</b> This' },
          { text: '<b>Share</b> This' },
          { text: 'Move' }
        ],
        titleText: 'select your favourite project ',
        cancelText: 'Cancel',
        cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
          return true;
        },
        cssClass:'center'
      });


    };

  })
