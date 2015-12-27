'use strict';

angular.module('app.main')
    .controller('MainController', function (authenticate) {
      var vm = this;
      vm.authenticated = authenticate.authenticated;
      
      activate();
      
      function activate() {
        //authenticate.logout();
        //$("#logout").removeClass("logout-visible").addClass("logout-hidden");
        //$scope.$emit("loggedOff", {});
		 //$state.go('expenses');
      }

	/*.controller('MainController', function ($scope, Principal) {
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;
        });*/
    });
