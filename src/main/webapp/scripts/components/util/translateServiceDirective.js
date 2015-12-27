angular.module('app.translate') .directive('ngTranslateLanguageSelect', function (LocaleService) { 'use strict';

        return {
            restrict: 'A',
            replace: true,
            template: ''+
            /*'<div class="language-select" ng-if="visible">'+
                '<label>'+
                    '<select ng-model="currentLocaleDisplayName"'+
                        'ng-options="localesDisplayName for localesDisplayName in localesDisplayNames"'+
                        'ng-change="changeLanguage(currentLocaleDisplayName)">'+
                    '</select>'+
                '</label>'+
            '</div>'+
            '',*/
            // TODO: Put this into templateURL !!
            '<div id="language-dropdown" ng-if="visible">' +
            '<!-- ngRepeat: language in languages --><li ng-repeat="language in languages" class="ng-scope" ng-class="{active: language==&#39;English&#39;}">' +
            '<a href="" ng-click="changeLanguage(language)" data-toggle="collapse" data-target=".navbar-collapse.in" class="ng-binding">{{language}}</a>' +
            '</li><!-- end ngRepeat: language in languages -->' +
            '</div>' +
            '',
          
            controller: function($scope) {
               /*$scope.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
                $scope.localesDisplayNames = LocaleService.getLocalesDisplayNames();
                $scope.visible = $scope.localesDisplayNames &&
                $scope.localesDisplayNames.length > 1;
    
                $scope.changeLanguage = function (locale) {
                    LocaleService.setLocaleByDisplayName(locale);
                };*/
            
            	
            	$scope.language = LocaleService.getLocaleDisplayName();
                $scope.languages = LocaleService.getLocalesDisplayNames();
                $scope.visible = $scope.languages &&
                $scope.languages.length > 1;
    
                $scope.changeLanguage = function (locale) {
                    LocaleService.setLocaleByDisplayName(locale);
                    

            	var dropdownRoot = $("#language-dropdown");
        	    var dropdownItems = dropdownRoot.children();
        	    for (var i=0; i < dropdownItems.length; i++) {
        	      var dropdown = dropdownItems[i];
        	      var dropdownClasses = dropdown.classList;
        	      if (dropdown.textContent == locale) {
        	        if (!dropdownClasses.contains("active")) {
        	    	  dropdownClasses.add("active");
        	        }
        	      } else {
        	    	  dropdown.removeAttribute("ng-class");
        	    	  dropdownClasses.remove("active");
        	      }               	       
        	    }      
              }; 
            }
        };
    });