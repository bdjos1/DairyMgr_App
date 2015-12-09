(function() {
	
	'use strict';
	angular.module('app.expenses').factory('dataservice', dataService);
	
	
	
	function dataService($http, $q, $resource) {
		var errorMsg = "";
		var parse = "";
	
	   var dataservice = {
         addApplicationData: addApplicationData,
         deleteApplicationData: deleteApplicationData,
         modifyApplicationData: modifyApplicationData,
         getApplicationData: getApplicationData
	   }
	   return dataservice;
	   
	   function getApplicationData(url, objectType, parseData) {
		   var callback = getAllApplicationDataComplete;
		   if (!parseData) {
			   callback = getApplicationDataComlete;
		   }
		   checkFxnTwoParamsSet(url, objectType);
		   //TODO: http Vs NgResource Vs Restangular - Restangular 
		   // The latter may need to be used for more complex scenarios
			return $http.get(url)
            .then(callback)
            .catch(function(message) {
            	//alert("issue");
                //exception.catcher('XHR Failed for getApplicationData')(message);
                //$location.url('/');
            	return 'Failed to get ' + objectType + '.';
            });

            function getAllApplicationDataComplete(data, status, headers, config) {
             
            	  return data.data._embedded;
            }
            
            function getApplicationDataComlete(data, status, headers, config) {             
          	  return data.data;
            }
	   }
	  	   
	   function addApplicationData(url, object, objectType) {
		   checkFxnAllParamsSet(url, objectType, object);
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
		   checkFxnAllParamsSet(url, objectType, object);
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
	   
	   function deleteApplicationData(url) {
		   //checkFxnAllParamsSet(url, objectType, object);
		   return $http.delete(url)
           .then(function(response) {
        	 return response.data;
           }).catch(function(message) {
           	//alert("issue");
               //exception.catcher('XHR Failed for getApplicationData')(message);
               //$location.url('/');
           	return 'Failed to delete ' + objectType + ' ' + JSON.stringify(object) + '. Perhaps this item no longer exists.';
           }); 
	   }
	   
	   function checkFxnAllParamsSet(url, objectType, object) {
		 checkFxnTwoParamsSet(url, objectType, object);
	     
	     if (object == undefined) {
	    	 throw new Error("'object' paramater must be set.");
	     }
	   }
	   
	   function checkFxnTwoParamsSet(url, objectType) {
	     if (url == undefined) {
	    	 throw new Error("'url' paramater must be set.");
		 }
		     
		 if (objectType == undefined) {
		   throw new Error("'objectType' paramater must be set.");
		 }
	   }
	}
	
})();
