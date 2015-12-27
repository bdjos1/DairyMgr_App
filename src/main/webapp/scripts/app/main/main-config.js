'use strict';

angular.module('app.main').run(function() {	
}).config(function ($stateProvider) {
        $stateProvider
            .state('home', {
                parent: 'banner',
                url: '/',
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/main/main.html',
                        controller: 'MainController',
                        controllerAs: 'ctrl'
                    }
                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('main');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            });
    });
