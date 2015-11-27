angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})
.service('storage', function($localStorage) {
  var storage = this;

  storage.db = $localStorage.$default({
    reminders: true,
    targetQuantity: 3,
    intakes: []
  });

  // storage.set = function(key, val) {
  //   storage.db[key] = val;
  // };
  //
  // storage.get = function(key) {
  //   return storage.db[key];
  // }
  //
  // storage.delete = function(key) {
  //   delete storage.db[key];
  // }
})
.service('Intake', function(storage) {
  var Intake = this;

  var quantities = {
    gulp: 50,
    cup: 100,
    glass: 250
  };

  Intake.register = function(intakeType) {
    var quantity = quantities[intakeType] || 50;

    var intake = {
      quantity: quantity,
      time: +new Date()
    };

    storage.db.intakes.push(intake);
  };

  Intake.totalInDay = function(time) {
    if(time == undefined) {
      time = +new Date();
    };

    var start = new Date(time).setHours(0,0,0,0);
    var end = new Date(time).setHours(23,59,59,999);

    var totalQuantity = 0;
    angular.forEach(storage.db.intakes, function(intake) {
      if (intake.time > start && intake.time < end) {
        totalQuantity += intake.quantity;
      }
    });

    return totalQuantity;
  };
});
