//(function() 
  'use strict';
  angular.module('app.expenses').config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');
   $stateProvider
			.state('expenses', {
				name: 'expenses',
				url: '/expenses',
				templateUrl: 'scripts/components/expenses/expenses.html',
				controller: 'ExpensesController',
                controllerAs: 'ctrl',
				/*resolve: {
                dataservice: function(dataservice) {
                    return dataservice.getApplicationData();
                }
               }*/
  })
  .state('new_expense', {
		name: 'new_expense',
		url: '/new_expense/:url',
		templateUrl: 'scripts/components/expenses/new_expense.html',
		controller: 'ExpensesController',
        controllerAs: 'ctrl',
  }).
  state('home', {
		name: 'home',
		url: '/home',
		templateUrl: 'scripts/components/expenses/home.html'
  });
});
//})();