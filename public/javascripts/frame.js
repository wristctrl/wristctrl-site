var app = angular.module("app", ["firebase"]);

app.controller("MarketplaceCtrl", function($scope, $firebase) {
  var ref = new Firebase("https://8tracks-pebble.firebaseio.com/marketplace");
  var sync = $firebase(ref);
  $scope.plugins = sync.$asArray();

  $scope.addPlugin = addPlugin;
});

var addPlugin = function(plugin) {
  var currPlugin = plugin.$id;

  var uniqueId = localStorage.getItem("ctrl-uniqueId");

  var fb = new Firebase('https://8tracks-pebble.firebaseio.com/');

  fb.child('marketplace').child(currPlugin).once('value', function(snapshot) {
    var pluginCopy = snapshot.val();

    fb.child('codes').child(uniqueId).child('plugins').child(currPlugin).update(pluginCopy);
    fb.child('codes').child(uniqueId).child('plugins').child(currPlugin).child('img').remove();

    var pluginMap = {};
    pluginMap[currPlugin] = pluginCopy.map.site;
    fb.child('codes').child(uniqueId).child('plugin-map').update(pluginMap);
  });

};

