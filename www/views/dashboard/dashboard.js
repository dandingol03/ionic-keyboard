angular.module('app')

  .controller('dashboardController',function($scope,$state,$http, $location,
                                             $rootScope,$ionicModal,$timeout,
                                             $cordovaCamera,ionicDatePicker,
                                             $ionicActionSheet){


    $scope.goto=function(url){
      $location.path(url);
    };



    //use factory to improve
    $scope.datepick = function(){
      var ipObj1 = {
        callback: function (val) {  //Mandatory
          var t1 = document.getElementById('date');//根据id获取input节点
          var date=new Date(val);
          var month=parseInt(date.getMonth())+1;
          t1.value=date.getFullYear()+'-'+month+'-'+date.getDate();
        },
        disabledDates: [            //Optional
          new Date(2016, 2, 16),
          new Date(2015, 3, 16),
          new Date(2015, 4, 16),
          new Date(2015, 5, 16),
          new Date('Wednesday, August 12, 2015'),
          new Date("08-16-2016"),
          new Date(1439676000000)
        ],
        from: new Date(1949, 10, 1), //Optional
        to: new Date(2040, 10, 30), //Optional
        inputDate: new Date(),      //Optional
        mondayFirst: false,          //Optional
        disableWeekdays: [0],       //Optional
        closeOnSelect: false,       //Optional
        templateType: 'popup'     //Optional
      };
      ionicDatePicker.openDatePicker(ipObj1);
    };


    $scope.car={};

    /*** bind car modal ***/
    $ionicModal.fromTemplateUrl('views/modal/bind_car.html',{
      scope:  $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.bind_car_modal = modal;
    });

    $scope.openCarModal= function(){
      $scope.bind_car_modal.show();

    };

    $scope.closeCarModal= function() {
      $scope.bind_car_modal.hide();
    };
    /*** bind car modal ***/

    /*** bind life modal ***/
    $ionicModal.fromTemplateUrl('views/modal/coverage_modal.html',{
      scope:  $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.coverage_modal = modal;
    });

    //待定
    if(window.cordova!==undefined&&window.cordova!==null)
    {
      $scope.open_lifeModal= function(){
        cordova.plugins.Keyboard.show();
        //$scope.coverage_modal.show();
      };
    }

    $scope.close_lifeModal= function() {
      $scope.coverage_modal.hide();
    };
    /*** bind life modal ***/




    $scope.check_carInfo=function(){
      if($rootScope.car!==undefined&&$rootScope.car!==null)
      {

      }else{
        $timeout(function(){
          $scope.openModal();
        },300);
      }
    };

    $scope.bind_car=function(){
      $rootScope.car=$scope.car;
      $scope.closeCarModal();
    }

    $scope.addPicture = function(type) {

      $ionicActionSheet.show({
        buttons: [
          { text: '拍照' },
          { text: '从相册选择' }
        ],
        titleText: '选择照片',
        cancelText: '取消',
        cancel: function() {
          return true;
        },
        buttonClicked: function(index) {
          if(index == 0){
            $scope.takePhoto=function(){
              var options = {
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: 1,
                saveToPhotoAlbum: true
              };

            }
          }else if(index == 1){
            var options = {
              destinationType: Camera.DestinationType.FILE_URI,
              sourceType: 0
            };
          }

          $cordovaCamera.getPicture(options).then(function(imageURI) {
            $scope.car[type].imageSrc= imageURI;

          }, function(err) {
            // error
          });
          return true;
        }
      });
    }

    $scope.life_insurance=
    {
      applicant:{},
      insuredPerson:{}
    };

    $scope.car={};

    $scope.apply=function () {
      $scope.life_insurance.state = 'pricing';//订单状态是报价中
      $rootScope.life_insurance = $scope.life_insurance;
      $scope.close_lifeModal();
    }


    //车险险种选择
    $scope.specials_apply=function(){
      var specials=[];
      $scope.motor_specials.map(function (special, i) {
        if(special.checked==true)
          specials.push(special);
      });
      if(specials.length==0)
        alert("请选择一项险种");
      else{
        //TODO:inject into $rootScope
        $rootScope.specials=specials;
        for(var i=0;i<specials.length;i++){
        delete $rootScope.specials[i].$$hashKey;
        }
      }
    }



    //寿险列表获取
    $http({
      method:"get",
      url:"/proxy/insurance/insurance/get_lifeinsurance_list"
    }).success(function(response){
      var life_insurances=response.life_insurances;
      if(Object.prototype.toString.call(life_insurances)!='[object Array]')
        life_insurances=JSON.parse(life_insurances);

      $scope.life_insurances=life_insurances;

      //get 车险险种列表
      $http({
        method:"get",
        url:"/proxy/insurance/insurance/project_provide"
      }).success(function(response){
        var projects=response.projects;
        if(Object.prototype.toString.call(projects)!='[object Array]')
          projects=JSON.parse(projects);
        $scope.motor_specials=projects;
        $scope.tabs=[
          {type:'车险',insurances:$scope.motor_specials},
          {type:'寿险',insurances:$scope.life_insurances},
          {type:'维修'},
          {type:'车驾管服务',
            services:[
              {name:'代办车辆年审',href:''},
              {name:'代办驾驶证年审',href:''},
              {name:'取送车',href:''},
              {name:'接送机',href:''},
              {name:'违章查询',href:''}
            ]
          }
        ];

      }).error(function(err){
        if(err!==undefined&&err!==null)
          console.error(err.toString());
      });

    }).error(function(err){
      if(err!==undefined&&err!==null)
        console.error(err.toString());
    });




    $scope.tabIndex=0
    $scope.tab_change=function(i){
      $scope.tabIndex=i;
    };
    $scope.life_insuranse={};
    $scope.detail_ref=function(insurance){
      switch($scope.tabIndex)
      {
        case 0:
              break;
        case 1:
          $state.go('life_insurance_detail',{insurance:JSON.stringify(insurance)});
              break;
        default:
              break;
      }
    }

    //车险保额选择
    $scope.price_select=function(item,prices) {
      if (prices !== undefined && prices !== null &&prices.length > 0)
      {
        var buttons=[];
        prices.map(function(price,i) {
          buttons.push({text: price});
        });
        $ionicActionSheet.show({
          buttons:buttons,
          titleText: '选择你的保额',
          cancelText: 'Cancel',
          buttonClicked: function(index) {
            item.price = prices[index];
            return true;
          },
          cssClass:'motor_insurance_actionsheet'
        });
      }
      else
      {}
    }

    //绑定车主信息
    $scope.bind_car=function(){
      $rootScope.carInfo=$scope.carInfo;
      $state.go('car_insurance');
    }

    $scope.service='代办车辆年审';
    $scope.services=[
      '代办车辆年审',
      '代办驾驶证年审',
      '取送车',
      '接送机',
      '违章查询'
    ];

  });
