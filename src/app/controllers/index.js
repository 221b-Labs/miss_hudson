ngApp.controller('IndexCtrl', ['$scope', '$firebase', '$firebaseSimpleLogin', '$http', '$modal', function($scope, $firebase, $firebaseSimpleLogin, $http, $modal) {
  var db = new Firebase('https://glaring-fire-8324.firebaseio.com/users');

  $scope.users = $firebase(db);
  $scope.auth  = $firebaseSimpleLogin(db);

  $scope.user;
  $scope.selectedLanguages = [];

  $scope.login = function() {
    $scope.auth.$login('github', {}).then(function(user) {
      $scope.user = user;

      $http.post('/languages', {'username': $scope.user.username})
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

      $modal.open({
        template: '<div class="modal-header">
          <button type="button" class="close" ng-click="$close()" aria-hidden="true">&times;</button>
          <h4 class="modal-title">Congratulations!</h4>
        </div>
        <div class="modal-body">
          Successfully Saved!
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" ng-click="$close()">Close</button>
        </div>',
        controller: 'IndexCtrl',
      });
    } else {
      $modal.open({
        template: '<div class="modal-header">
          <button type="button" class="close" ng-click="$close()" aria-hidden="true">&times;</button>
          <h4 class="modal-title">Notice!</h4>
        </div>
        <div class="modal-body">
          You\'ve already signed up!
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" ng-click="$close()">Close</button>
        </div>',
        controller: 'IndexCtrl',
      });
    }
  };
  // , {"key": user.accessToken, "name": user.name}
}]);
