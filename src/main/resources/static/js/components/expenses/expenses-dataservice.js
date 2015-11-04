(function() {
	
	'use strict';
	angular.module('shared.expenses').factory('expensesDataService', expensesDataService);
	
	
	function expensesDataService($http) {
	
	   var expensesService = {
         addExpense: addExpense,
         //deleteExpense: deleteExpense,
         //modifyExpense: modifyExpense,
         getExpenses: getExpenses
	   }
	   return expensesService;
		/*var expensesService = {};
		expensesService.getExpenses = function() {
		   var promise = $http.get('/expenses')
	            .then(function (expenses) {
	           return expenses;
	       });
	        return promise;
		}*/
		//var expensesService = {};
	    function getExpenses() {
			return $http.get('/expenses')
            .then(getExpensesComplete)
            .catch(function(message) {
            	alert("issue");
                exception.catcher('XHR Failed for getExpenses')(message);
                //$location.url('/');
            });

            function getExpensesComplete(data, status, headers, config) {
              return data;
            }
	   }
	  
	   
	   function addExpense(expense) {
		   // TODO: Proper error handling here..
		   $http.post('/expenses/add', expense).success(function(response) {
			      return response;
			    }).error(function() {
			      //$scope.status = 'Failed...';
			    });
	   }
	   
	   /*function deleteExpense() {
		
	   }
	   
	   function modifyExpense() {
		
	   }*/
	}
	
})();
