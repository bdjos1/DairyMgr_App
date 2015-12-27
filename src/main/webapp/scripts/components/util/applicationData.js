(function() {
 'use strict';
 
 angular.module('expenses').controller('appDataController', appDataController); 
 
   function appDataController(dataservice) {
	  
	   /*jshint validthis: true */
       var vm = this;
       vm.expenses = [];
       //vm.title = 'Expenses';
       //var url = "/expenses";

       vm.activate();

       vm.activate = function() {
//           Using a resolver on all routes or dataservice.ready in every controller
//           var promises = [getAvengers()];
//           return dataservice.ready(promises).then(function(){
           return getExpenses(url, vm.title).then(function(data) {
        	   //alert("HA HA" + data);
               //logger.info('Activated Avengers View');
           });
           //return getExpenses();
       }

       vm.getExpenses = function(url, expenses) {
           return dataservice.getApplicationData().then(function(data) {
        	   vm.expenses = data;
               return vm.expenses;
           });
       }
	   
   }

})();