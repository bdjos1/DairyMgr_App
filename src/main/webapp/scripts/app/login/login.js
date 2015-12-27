(function() {
 'use strict';
 
 angular.module('app.login').controller('LoginController', LoginController); 
 
   //ExpensesController.$inject = ['dataservice'];
   function LoginController($q, $scope,$state,authenticate) {
	  
	   /*jshint validthis: true */
       var vm = this;
       vm.authenticated = authenticate.authenticated;
      

       vm.login = function() {
    	   //dataservice.getApplicationData('/expenses', "Expenses")
    	   var promise = authenticate.login(vm.credentials.username, vm.credentials.password);
    	   
    	   promise.then(function() {
    		   vm.authenticated = authenticate.authenticated;
    		  
        	   if (vm.authenticated == true) {
        		   var loginLink = $("#login");
        		   var logoutLink = $("#logout");
        		   // TODO: Cache these in local storage or constants!! 
        		   $scope.$emit("loggedOn", {logoutLink, loginLink});
        		   $state.go('home');
        	   }
           }, function(reason) {
        	   vm.authenticationError = authenticate.error;
           });
    	  
       }
   }

})();
