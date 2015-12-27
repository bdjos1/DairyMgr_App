(function() {
 'use strict';
 
 angular.module('users').controller('usersController', usersController);
 
   function usersController(dataservice) {
	  
	   /*jshint validthis: true */
       var vm = this;
       vm.users = [];
       vm.title = 'users';

       activate();

       function activate() {
//           Using a resolver on all routes or dataservice.ready in every controller
//           var promises = [getAvengers()];
//           return dataservice.ready(promises).then(function(){
           return getUsers().then(function(data) {
        	   //alert("HA HA" + data);
               //logger.info('Activated Avengers View');
           });
           //return getExpenses();
       }

       function getUsers() {
           return dataservice.getApplicationData().then(function(data) {
        	   vm.users = data;
               return vm.users;
           });
       }
	   
   }

})();
