(function() {
	
	'use strict';
	angular.module('app.expenses').factory('authenticate', authService);
	
	
	
	function authService($http, $state, $q, $location) {
		var errorMsg = "";
		var parse = "";
	
	   var authservice = {
		 error : undefined,
		 authenticated : false,
	     credentials : {},
	     authenticate: authenticate,
         login: login,
         logout: logout
	   }
	   return authservice;
	   
	
	function authenticate(service, user, password, callback) {

		var headers = service.credentials ? {
			authorization : "Basic "
					+ btoa(user + ":"
							+ password)
		} : {};
		
		//var temp = "X-Requested-With: XMLHttpRequest";

		$http.get('users', {
			headers : headers
		}).success(function(data) {
			if (data) {
		      for (var i = 0; i < data._embedded.users.length; i++) {
		    	 var storedUser = data._embedded.users[i]; 
		    	if (user == storedUser.user &&  password == storedUser.password) {
		    		service.authenticated = true;	  
		    	}
		      }
			}
			
			callback && callback(service);
		}).error(function() {
		    service.authenticated = false;
			callback && callback(service);
		});

	}
	
	function login(user, password) {
		 var deferred = $q.defer();
		authenticate(this, user, password, function(service) {
			if (service.authenticated) {
				console.log("Login succeeded")
				$location.path("/");
				service.error = false;
				service.authenticated = true;
				deferred.resolve(service.authenticated);
				//return service.authenticated;
			} else {
				console.log("Login failed");
				$location.path("/login");
				service.error = true;
				service.authenticated = false;
				deferred.reject("Login failed");
				//return service.authenticated;
			}
		});
		return deferred.promise;
	}
	
	function logout() {
	  $location.path("/logout");
	  var deferred = $q.defer();
	  this.authenticated = false;
	  deferred.resolve(this.authenticated);
	  return deferred.promise;
	}
	
  }

	
})();
