//(function() 
  'use strict';
  angular.module('app',['app.config']).run(function ($rootScope,  $location, $window, $http, $state, $translate, authenticate) {
	  
	  if (!authenticate.authenticated) {
		$state.go('home');  
	  }
	 
	  var hideOrShowLogoutAndLoginLinks = function(linkToShow, linkToHide) {
		  linkToShow.removeClass("link-hidden").addClass("link-visible");
		  linkToHide.removeClass("link-visible").addClass("link-hidden");
	  }
	  
	  var updateTitle = function(titleKey) {
          if (!titleKey && $state.$current.data && $state.$current.data.pageTitle) {
              titleKey = $state.$current.data.pageTitle;
          }
          $translate(titleKey || 'global.title').then(function (title) {
              $window.document.title = title;
          });
      };
      

      $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
          $rootScope.toState = toState;
          $rootScope.toStateParams = toStateParams;

          /*if (Principal.isIdentityResolved()) {
              Auth.authorize();
          }
          
          // Update the language
          Language.getCurrent().then(function (language) {
              $translate.use(language);
          });*/
          
      });
      
      $rootScope.$on('$stateChangeSuccess',  function(event, toState, toParams, fromState, fromParams) {
          var titleKey = 'global.title' ;

          // Remember previous state unless we've been redirected to login or we've just
          // reset the state memory after logout. If we're redirected to login, our
          // previousState is already set in the authExpiredInterceptor. If we're going
          // to login directly, we don't want to be sent to some previous state anyway
          if (toState.name != 'login' && $rootScope.previousStateName) {
            $rootScope.previousStateName = fromState.name;
            $rootScope.previousStateParams = fromParams;
          }

          // Set the page title key to the one configured in state or use default one
          if (toState.data.pageTitle) {
              titleKey = toState.data.pageTitle;
          }
          updateTitle(titleKey);
      });
      
      $rootScope.$on('loggedOn', function(event, args) { 
        // after successfull login, hide login link and enable logout link
    	hideOrShowLogoutAndLoginLinks(args.logoutLink, args.loginLink);
	  });
      
      $rootScope.$on('loggedOut', function(event, args) {
    	// after successfull logout, hide logout link and enable login link
    	hideOrShowLogoutAndLoginLinks(args.loginLink, args.logoutLink);
	  });
      
      $rootScope.back = function() {
          // If previous state is 'activate' or do not exist go to 'home'
          //if ($rootScope.previousStateName === 'activate' || $state.get($rootScope.previousStateName) === null) {
          if ($rootScope.previousStateName === 'login' || $state.get($rootScope.previousStateName) === null) {
              $state.go('home');
          } else {
              $state.go($rootScope.previousStateName, $rootScope.previousStateParams);
          }
      };
  }).
  config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

  //$urlRouterProvider.otherwise('/');
   $stateProvider.state('logout', {
		name: 'logout',
		url: '/logout',
		 data: {
             authorities: [],
             pageTitle: 'LOGOUT'
         },
         views: {
             'content@': {
                 templateUrl: 'scripts/app/main/main.html',
                 controller: 'BannerController',
                 controllerAs: 'ctrl'
             }
         }
  }).state('banner', {
       'abstract': true,
        views: {
                'navbar@': {
                    templateUrl: 'scripts/components/navbar/banner.html',
                    controller: 'BannerController',
                    controllerAs: 'ctrl'
                }
            },
            data: {
                authorities: [],
                pageTitle: 'LOGOUT'
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        });
   //$locationProvider.html5Mode(true);
   $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
});
//})();
