//(function() 
  'use strict';
  angular.module('app.expenses').config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

  //$urlRouterProvider.otherwise('/');
   $stateProvider
   .state('expenses', {
		parent: 'banner',
		name: 'expenses',
		url: '/expenses',
		views: {
	             'content@': {
	                 templateUrl: 'scripts/components/expenses/expenses.html',
	                 controller: 'ExpensesController',
	                 controllerAs: 'ctrl'
	             }
	   },
       resolve: {
         mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
           $translatePartialLoader.addPart('expenses');
           return $translate.refresh();
         }]
       }
  }).state('new_expense', {
    parent: 'banner',
    name: 'new_expense',
    url: '/new_expense/:url',
    data: {
      authorities: [],
      pageTitle: 'New EXPENSE'
      
    },
	views: {
        'content@': {
            templateUrl: 'scripts/components/expenses/new_expense.html',
            controller: 'ExpensesController',
            controllerAs: 'ctrl'
        }
    },
    resolve: {
        mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
          $translatePartialLoader.addPart('expenses');
          return $translate.refresh();
        }]
     }
  });
  });
//})();