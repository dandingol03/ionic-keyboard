// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'ui.router','ngCordova','ionic-datepicker'])


  .run(function($ionicPlatform,$location,$rootScope,$ionicHistory,$state,$ionicModal) {

    $rootScope.myGoBack = function() {
      //$rootScope.$ionicGoBack();
      var backView = $ionicHistory.backView();
      backView.go();
    };

    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });

    //订单全局
    $rootScope.orders=[
      {name:'待支付订单',activated:false,orders:
        [
          {
            type:'车险',schemes:[
            {name:'brazil',coverage:300,fee:500,spectum:2},
            {name:'honda',coverage:300,fee:500,spectum:1},
            {name:'R1',coverage:300,fee:500,spectum:1},]
          },
          {
            // {name:'新华保险',coverage:1205,fee:3000,'缴费期间':'3年','保额期间':'3年','首年保费':400000},
            type:'寿险',main:{name:'新华保险',coverage:1205,fee:3000,'缴费期间':'3年','保额期间':'3年','首年保费':400000},additions:[
            {name:'addition1',fee:300},
            {name:'addition2',fee:800}]
          },
          {
            type:'寿险',main:{name:'india洋',coverage:300,fee:200},additions:[
            {name:'addition1',fee:300},
            {name:'addition2',fee:800}]
          }
        ]},
      {name:'已完成订单',activated:false,orders:[]},
      {name:'估价中订单',activated:false,orders:[]}
    ];



  })


  .config(function (ionicDatePickerProvider) {
    var datePickerObj = {
      inputDate: new Date(),
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      mondayFirst: false,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      from: new Date(2012, 8, 1),
      to: new Date(2018, 8, 1),
      showTodayButton: true,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: false,
      disableWeekdays: [6]
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  })

  .config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js

    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('left');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');

      $stateProvider.state('login',{
        url:'/login',
        controller: 'loginController',
        templateUrl:'views/login/login.html'
      });

      $stateProvider.state('tabs',{
        url:'/tabs',
        abstract:true,
        templateUrl:'views/tabs/tabs.html'
      });

      //$stateProvider.state('tabs.dashboard',{
      //  url:'/dashboard',
      //  views:{
      //    'dashboard-tab':{
      //      controller:'dashboardController',
      //      templateUrl:'views/dashboard/dashboard.html'
      //    }
      //  }
      //});

    $stateProvider.state('tabs.dashboard',{
      url:'/dashboard',
      views:{
        'dashboard-tab':{
          controller:'dashboardController',
          templateUrl:'views/dashboard/dashboard.html'
        }
      }
    });

    //$stateProvider.state('dashboard',{
    //  url:'/dashboard',
    //  controller:'dashboardController',
    //  templateUrl:'views/dashboard/dashboard.html'
    //});



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tabs/dashboard');

});
