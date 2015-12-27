(function() {
 'use strict';
 
 angular.module('app.expenses').controller('ExpensesController', ExpensesController); 
 
   //ExpensesController.$inject = ['dataservice'];
   function ExpensesController($q, $controller, $stateParams, $state, authenticate, dataservice) {
	  
	   /*jshint validthis: true */
       var vm = this;
       vm.restData = [];
       vm.id = undefined;
       vm.title = 'Expenses';
       var url = "/expenses";
       //vm.child = $controller('appDataController',{});
       //vm.expense = expense;
       vm.expenseAdded = false;
       vm.authenticated = authenticate.authenticated;

       activate();
       vm.submit = function() {
    	   if (vm.isUpdate) {
     		  modifyExpense(vm.merchantName, vm.dateOfPurchase, vm.paidByCredit, vm.paymentDueDate);  
     	  } else {
     		 addExpense(vm.merchantName, vm.dateOfPurchase, vm.paidByCredit, vm.paymentDueDate);
     	  }
    	  $state.go('expenses');
       }
       vm.addExpense = function() {
    	   addExpense(vm.merchantName, vm.dateOfPurchase, vm.paidByCredit, vm.paymentDueDate);
    	   //getExpenses(url, vm.title);
       }
       vm.modifyExpense = function() {
    	   modifyExpense(vm.merchantName, vm.dateOfPurchase, vm.paidByCredit, vm.paymentDueDate);
    	   //getExpenses(url, vm.title);
       }
       vm.deleteExpense = function(href) {
    	   //var temp = vm._links.self.href;
    	   //debugger;
    	   deleteExpense(href);
    	   getExpenses(url, vm.title);
       }
       vm.login = function() {
    	   //dataservice.getApplicationData('/expenses', "Expenses")
    	   authenticate.login(vm.credentials.username, vm.credentials.password);
    	   vm.authenticated = authenticate.authenticated;
    	   if (vm.authenticated == true) {
    		   //$state.go('expenses');
    	   }
       }

       function activate() {
    	   //$translatePartialLoader.addPart('expenses');
    	   //$translate.refresh();
//           Using a resolver on all routes or dataservice.ready in every controller
           //var promises = [getExpenses(url, vm.title), addExpense(vm.merchantName, vm.dateOfPurchase, vm.paidByCredit, vm.paymentDueDate)];
           var promises = [getExpenses(url, vm.title)];
//           return dataservice.ready(promises).then(function(){
           //return getExpenses(url, vm.title).then(function(data) {
        	   //alert("HA HA" + data);
               //logger.info('Activated Avengers View');
           //});
           return $q.all(promises).then(function() {
              // logger.info('Activated Dashboard View');
        	   //alert("WOHOO");
           });
       }

       function getExpenses(url, expenses) {
    	   var restUrl = url;
    	   var parseData = true;
    	   if ($stateParams.url) {
    		   restUrl =  decodeURIComponent($stateParams.url);
    		   //alert(restUrl);
    		   parseData = undefined;
    	   }
    	   // TODO: How to verify parameters correctly passed into service!
           return dataservice.getApplicationData(restUrl, expenses, parseData).then(function(data) {
        	   vm.restData = data;
        	   if ($stateParams.url) {
        		 vm.merchantName = data.merchantName;
        		 vm.isUpdate = true;
        		 vm.dateOfPurchase = new Date(data.dateOfPurchase);
        		 vm.paymentDueDate = new Date(data.paymentDueDate);
        	     return data;
        	   }
        	   return vm.restData.expenses;
        	
           });
       }
       
       function addExpense(merchantName, dateOfPurchase, paidByCredit, paymentDueDate) {	   
    	   if (merchantName) {
    		   var expense = {"merchantName" : merchantName, "dateOfPurchase" : dateOfPurchase, "paidByCredit": paidByCredit, "paymentDueDate": paymentDueDate};
    		   // TODO: How to verify parameters correctly passed into service!
    	       return dataservice.addApplicationData(url, expense, vm.title).then(function(data) {
    	    	  //alert("ADDED");
    	    	   vm.expenseAdded = true;
    	    	   return vm.expenseAdded;
    	       });   
    	   }   
       }
       
       function modifyExpense(merchantName, dateOfPurchase, paidByCredit, paymentDueDate) {
    	   var targetUrl = decodeURIComponent($stateParams.url);
    	   if (merchantName) {
    		   var expense = {"merchantName" : merchantName, "dateOfPurchase" : dateOfPurchase, "paidByCredit": paidByCredit, "paymentDueDate": paymentDueDate};
    		   // TODO: How to verify parameters correctly passed into service!
    	       return dataservice.modifyApplicationData(targetUrl, expense, vm.title).then(function(data) {
    	    	  //alert("ADDED");
    	    	   vm.expenseAdded = true;
    	    	   return vm.expenseAdded;
    	       });   
    	   }
		   
       }
       
       function deleteExpense(url) {
	       return dataservice.deleteApplicationData(url).then(function(data) {
	    	  //alert("DELETED");	    	   
	       });   
       }	   
   }

})();
