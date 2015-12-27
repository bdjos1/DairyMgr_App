'use strict';

angular.module('app.main').config(function ($stateProvider) {
        $stateProvider
        .state('login', {
    	    parent: 'banner',
    		name: 'login',
    		url: '/login',
    		 data: {
                 authorities: [],
                 pageTitle: 'LOGIN'
             },
    		views: {
                  'content@': {
                      templateUrl: 'scripts/app/login/login.html',
                      controller: 'LoginController',
                      controllerAs: 'ctrl'
                  }
              },
              resolve: {
                  translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                      $translatePartialLoader.addPart('login');
                      return $translate.refresh();
                  }]
              }
        });
    });
