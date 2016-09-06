angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})



  .controller('loginController',function($scope,$state,$ionicLoading,$http
    ,$ionicPopup,$timeout){


    $scope.formUser = {};

    //执行用户登录操作
    $scope.doLogin = function(){

    };

    $scope.showErrorMesPopup = function(title) {
      var myPopup = $ionicPopup.show({
        title: '<b>'+title+'</b>'
      });
      $timeout(function() {
        myPopup.close(); // 2秒后关闭
      }, 1000);
    };

    $scope.showSuccessMesPopup = function(title) {
      var myPopup = $ionicPopup.show({
        title: '<b>'+title+'</b>',
        template: '<p style="text-align: center"><ion-spinner icon="android" class="spinner-positive"></ion-spinner></p>'
      });
      $timeout(function() {
        myPopup.close(); // 2秒后关闭
        $state.go("tab.main");
      }, 2000);
    };


  });

