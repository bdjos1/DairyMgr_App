(function() {
	
	'use strict';
	angular.module('shared.expenses').factory('dataservice', dataService);
	
	
	
	function dataService($http, $q) {
		var errorMsg = "";
	
	   var dataservice = {
         addApplicationData: addApplicationData,
         deleteApplicationData: deleteApplicationData,
         modifyApplicationData: modifyApplicationData,
         getApplicationData: getApplicationData
	   }
	   return dataservice;
	   
	   function getApplicationData(url, objectType) {
			return $http.get(url)
            .then(getApplicationDataComplete)
            .catch(function(message) {
            	//alert("issue");
                //exception.catcher('XHR Failed for getApplicationData')(message);
                //$location.url('/');
            	return 'Failed to get ' + objectType + '.';
            });

            function getApplicationDataComplete(data, status, headers, config) {
              return data;
            }
	   }
	  	   
	   function addApplicationData(url, object, objectType) {
		   // TODO: Proper error handling here..
		   var deferred = $q.defer();
		   var service = this;
		   $http.post(url, object).success(function(response) {
			   deferred.resolve(response);
			    }).error(function() {
			       errorMsg = 'Failed to add ' + objectType + ' ' + JSON.stringify(object);
			       deferred.reject(errorMsg);
			    });
		   return deferred.promise;
	   }
	   
	   function modifyApplicationData(url, object, objectType) {
		   return $http.put(url, object)
           .then(function(response) {
        	 return response.data;
           }).catch(function(message) {
           	//alert("issue");
               //exception.catcher('XHR Failed for getApplicationData')(message);
               //$location.url('/');
        	   return 'Failed to update ' + objectType + ' ' + JSON.stringify(object) + '. Perhaps the identifier is incorrect.';
           }); 
	   }
	   
	   function deleteApplicationData(url, object, objectType) {
		   return $http.delete(url, object)
           .then(function(response) {
        	 return response.data;
           }).catch(function(message) {
           	//alert("issue");
               //exception.catcher('XHR Failed for getApplicationData')(message);
               //$location.url('/');
           	return 'Failed to delete ' + objectType + ' ' + JSON.stringify(object) + '. Perhaps this item no longer exists.';
           }); 
	   }
	}
	
})();
