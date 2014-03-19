ngApp.controller('IndexCtrl', ['$scope', '$firebase', '$firebaseSimpleLogin', '$http', function($scope, $firebase, $firebaseSimpleLogin, $http) {
  var db = new Firebase('https://glaring-fire-8324.firebaseio.com/users');

  $scope.users = $firebase(db);
  $scope.auth  = $firebaseSimpleLogin(db);

  $scope.user;
  $scope.selectedLanguages = [];

  $scope.login = function() {
    $scope.auth.$login('github', {}).then(function(user) {
      $scope.user = user;

      $http.get('data.json')
        .success(function(data, status) {
          $scope.languages = data.languages;
        })
        .error(function(data, status) {
          console.log(data);
        });

    }, function(error) {
    });
  };

  $scope.logout = function() {
    $scope.auth.$logout();
  };

  $scope.toggleLanguage = function(language) {
      var idx = $scope.selectedLanguages.indexOf(language);

      if (idx > -1) {
        $scope.selectedLanguages.splice(idx, 1);
      } else {
        $scope.selectedLanguages.push(language);
      }
    };

  $scope.save = function(){
    exists = _.select($scope.users, function(item) {
      return item.name === $scope.user.name;
    });

    if (exists.length <= 0) {
      $scope.users.$add({'provider': $scope.user.provider, 'uid': $scope.user.uid, 'name': $scope.user.name, 'email': $scope.user.email, 'languages': $scope.selectedLanguages});
    }
  };
  // , {"key": user.accessToken, "name": user.name}
}]);
