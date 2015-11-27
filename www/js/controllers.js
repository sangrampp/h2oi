angular.module('starter.controllers', [])

.controller('DashCtrl', function(Intake, storage) {
  var dash = this;

  function calculateTotalToday() {
    dash.totalToday = Intake.totalInDay(+new Date());
    dash.percentageComplete = dash.totalToday/(10*storage.db.targetQuantity);
  };

  dash.registerIntake = function(intakeType) {
    Intake.register(intakeType);
    calculateTotalToday();
  };

  calculateTotalToday();
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

.controller('AccountCtrl', function($scope, storage) {
  var account = this;
  var db = storage.db;
  account.reminders = db.reminders;
  account.targetQuantity = db.targetQuantity;
  $scope.$watch('account.reminders', function() {
    db.reminders = account.reminders;
  });
  $scope.$watch('account.targetQuantity', function() {
    db.targetQuantity = account.targetQuantity;
  });
});
