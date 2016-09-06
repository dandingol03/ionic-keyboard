/**
 * Created by yiming on 16/9/6.
 */
/**
 * Created by outstudio on 16/7/6.
 */



angular.module('app')
  .controller('carInfoController',function($scope,$http,$state,ionicDatePicker,$location,
                                           $cordovaImagePicker,$cordovaFileTransfer,$cordovaPreferences,
                                           $ionicActionSheet,$ionicLoading,$cordovaCamera){
    $scope.car=new Object();

    $scope.goto=function(url){
      $location.path(url);
    }






    $scope.nextStep=function(){

      $http({
        method:"post",
        params:{
          carInfo:
          {
            perName:$scope.car.perName,
            perIdCard:$scope.car.perIdCard,
            plateNum:$scope.car.plateNum,
            Model:$scope.car.model,
            VIN:$scope.car.VIN,
            engineNum:$scope.car.engineNum,
            registerDate:$scope.car.registerDate,
            inssueDate:$scope.car.inssueDate
          }
        },
        url:"/proxy/node/insurance/car_info_upload.do"
      }).success(function(response){
        var re = response.re;

      }).error(function(err){
        $ionicLoading.show({
          template:'connect the server timeout',
          duration:'2000'
        });
      })
    }
    $scope.images_list = [];
    // "添加附件"Event
    $scope.personIdCard={};
    $scope.driverCard={};


    //$scope.get_preference=function(a){
    //  $cordovaPreferences.fetch(a)
    //    .success(function(value) {
    //      return value;
    //    })
    //    .error(function(error) {
    //      alert("Error: " + error);
    //    });
    //}
    //
    //$scope.set_preference=function(name,val){
    //  $cordovaPreferences.store(name,val)
    //    .success(function(value) {
    //      alert("Success: " + value);
    //    })
    //    .error(function(error) {
    //      alert("Error: " + error);
    //    });
    //
    //}


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
              sourceType: 0,
            };
          }

          $cordovaCamera.getPicture(options).then(function(imageURI) {
            $scope[type].imageSrc= imageURI;

          }, function(err) {
            // error
          });
          return true;
        }
      });
    }


    $scope.getAdress=function(val){
      //document.getElementById('my').src=locals.get(val,'');

    }
    //$scope.Image = window.localStorage? localStorage.getItem(val): Cookie.read(val);
//图片上传upImage（图片路径）
//    var upImage = function (imageURI) {
//      document.addEventListener('deviceready', function () {
//        var url = "????";
//        var options = {};
//        $cordovaFileTransfer.upload(url, imageURI, options)
//          .then(function (result) {
//            alert(JSON.stringify(result.response));
//            alert("success");
//            alert(result.message);
//          }, function (err) {
//            alert(JSON.stringify(err));
//            alert(err.message);
//            alert("fail");
//          }, function (progress) {
//            // constant progress updates
//          });
//
//      }, false);






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






  })



