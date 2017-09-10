angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) {
  $scope.items = [1,2,3];
  $scope.boards = [{}];
  var userInfo = {
    "email": "admin@test.com",
    "password":"1234"
  };

  $http({
	  method: 'POST',
	  url: 'http://localhost:3000/api/Users/login',
    headers: {'Content-Type': 'application/json; charset=utf-8'},
    data: userInfo
    })
     .success(function(data) {
       console.log(data);
     })
     .finally(function() {
       // Stop the ion-refresher from spinning
       //$scope.$broadcast('scroll.refreshComplete');
     })



  $scope.doRefresh = function() {
    $http.get('/new-items')
     .success(function(newItems) {
       $scope.items = newItems;
     })
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     })
  };

  $scope.devList = [
    { text: "HTML5", checked: true },
    { text: "CSS3", checked: false },
    { text: "JavaScript", checked: false }
  ];

  $scope.pushNotificationChange = function() {
    console.log('Push Notification Change', $scope.pushNotification.checked);
  };
  
  $scope.pushNotification = { checked: true };
  $scope.emailNotification = 'Subscribed';
  $http({
	  method: 'GET',
	  url: 'http://localhost:3000/api/boards/1?access_token=qWQWAq3ybScI30q3ZtB01QsGSsVWcwCBB1wl0aDvhsFrR0u3KzsH44xrRqnvBXmX',
  	headers: {'Content-Type': 'application/json; charset=utf-8'}
    })
     .success(function(data) {
       $scope.boards = data;
       console.log(data);
     })
     .finally(function() {
       // Stop the ion-refresher from spinning
       //$scope.$broadcast('scroll.refreshComplete');
     })

})

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
});
