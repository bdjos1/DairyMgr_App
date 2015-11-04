(function() {
 'use strict';
 
 angular.module('shared.expenses').controller('expensesController', expensesController); 
 
   function expensesController(dataservice) {
	  
	   /*jshint validthis: true */
       var vm = this;
       vm.expenses = [];
       vm.title = 'expenses';

       activate();

       function activate() {
//           Using a resolver on all routes or dataservice.ready in every controller
//           var promises = [getAvengers()];
//           return dataservice.ready(promises).then(function(){
           return getExpenses().then(function(data) {
        	   //alert("HA HA" + data);
               //logger.info('Activated Avengers View');
           });
           //return getExpenses();
       }

       function getExpenses() {
           return dataservice.getExpenses().then(function(data) {
        	   vm.expenses = data;
               return vm.expenses;
           });
       }
	   
   }

})();
