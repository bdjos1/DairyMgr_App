//(function() {
// 'use strict';
 
 angular.module('app.login').directive('appBanner', function() {
	  return {
	      restrict: 'AE',
	      replace: 'true',
	      scope: true,
	      templateUrl: 'scripts/components/navbar/banner.html',
	      scope: { data: "@appBanner" },
	    	  
	    	  compile: function(tElem,attrs) {
        	    return function($scope) {
	    	      $scope.$on('loggedOn', function(event, args) { 
	    		    $("#logout").removeClass("logout-hidden").addClass("logout-visible");
		    	  });
	    	      $scope.$on('loggedOff', function(event, args) { 
		    	    $("#logout").removeClass("logout-visible").addClass("logout-hidden");
			      });
                };
	    		  //Read more at http://www.tutorialsavvy.com/2014/09/angularjs-publish-subscribe-using-emit-and-broadcast.html/#16FeHAotcZjrmUBh.99
	    	     
	    	    },
	    	    
	    	    link: function(scope, elem, attrs){
	    	    	 $scope.$on('loggedOn', function(event, args) { 
	    			 alert(args);
	    			  //$scope.childNameContainer = args.studentName; 
	    		     });
	    	      }
	  };
	  /*
	    var directive = angular.extend(this, {
		 restrict: 'AE',
	      replace: 'true',
	      templateUrl: 'scripts/components/expenses/banner.html',
	    	  
	    	  compile: function(tElem,attrs) {
	    		 // $scope.$on('loggedOn', function(event, args) { 
	    		//	  alert(args);
	    			  //$scope.childNameContainer = args.studentName; 
	    		//  });
	    		  //Read more at http://www.tutorialsavvy.com/2014/09/angularjs-publish-subscribe-using-emit-and-broadcast.html/#16FeHAotcZjrmUBh.99
	    	     
	    	    }
		  });
	  return directive;
	   */
});
