(function() {
 'use strict';
 
 angular.module('app.main').controller('BannerController', BannerController); 
 
   //ExpensesController.$inject = ['dataservice'];
   function BannerController($scope, $state, authenticate) {
	   /*jshint validthis: true */
       var vm = this;
       //vm.authenticated = authenticate.authenticated;
       vm.logout = function() {
    	   authenticate.logout();
    	   var loginLink = $("#login");
		   var logoutLink = $("#logout");
    	   $scope.$emit("loggedOut", {loginLink, logoutLink});
           $state.go('home');
       }
   }

})();
