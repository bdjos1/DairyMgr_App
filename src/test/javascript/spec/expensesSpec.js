/* jshint -W117, -W030 */
describe('expenses.controller', function () {

    beforeEach(module('app.expenses'));
    var deferred;
    var $controller;
    var $controllerProvider;
    var dataservice = {};
    var scope;
    var expense;
    var controller;
    dataservice.getApplicationData = function() {};
	dataservice.addApplicationData = function() {};
	dataservice.modifyApplicationData = function() {};
	dataservice.deleteApplicationData = function() {};
	var data = {};
    data.expenses = "expenses";      
    
	
   
    
    /*beforeEach(function() {
      dataServiceStub = sinon.stub({getExpenses: function() {
        console.log(arguments);
      }});
      dataServiceStub.getExpenses.returns('tyyiu');
    	 
      module(function($provide) {
       $provide.value('dataservice', dataServiceStub);
      })
    });*/
    
    beforeEach(module(function($provide) {
    	  //appDatacontroller = jasmine.createSpy();
          //$provide.value('appDatacontroller', appDatacontroller);
    	
    	
    }));

    
    beforeEach(inject(function(_$q_, _$rootScope_,$injector) {
        $rootScope = _$rootScope_;
        deferred = _$q_.defer();
        $controller = $injector.get('$controller');
        
        spyOn(dataservice, 'getApplicationData').and.returnValue(deferred.promise);
        expense = {
    			   "name" : "Expense1",
    	};
        spyOn(dataservice, 'addApplicationData').and.returnValue(deferred.promise);
        spyOn(dataservice, 'modifyApplicationData').and.returnValue(deferred.promise);
        spyOn(dataservice, 'deleteApplicationData').and.returnValue(deferred.promise);
        scope = $rootScope.$new();
        scope.expense = expense; 
        
        controller = $controller('ExpensesController', { 
            $scope: scope,
            //$controller: appDatacontroller, 
            dataservice: dataservice,
            $stateParams: {},
            $state: {},
            authenticate: {},
            expense : expense
          });
      }));
        
    it('getExpenses', function() {
    	
    	/*var dataservice = {};
    	dataservice.getApplicationData = function() {};
    	dataservice.addApplicationData = function() {};
        spyOn(dataservice, 'getApplicationData').and.returnValue(deferred.promise);
        var expense = {
 			   "name" : "Expense1",
 	    };
        spyOn(dataservice, 'addApplicationData').and.returnValue(deferred.promise);
        var scope = $rootScope.$new();
        scope.expense = expense;*/
        //var addAppDataSpy = spyOn(dataservice, 'addApplicationData');
        //addAppDataSpy.and.callFake(function(expense) {});
        
      
        /*var appDatacontroller = $controller('appDataController', { 
            $scope: $rootScope 
          });*/
        
        /*controller = $controller('ExpensesController', { 
          $scope: scope,
          //$controller: appDatacontroller, 
          dataservice: dataservice,
          $stateParams: {},
          $state: {},
          authenticate: {},
          expense : expense
        });*/

      
        deferred.resolve(data);

        $rootScope.$apply();
        
        expect(controller.restData.expenses).toBe('expenses');
    })
    
    it('addExpense', function() {
      deferred.resolve(data);
    	
      controller.merchantName = "merchantOne";
      controller.dateOfPurchase = "01/01/2016";
      controller.paidByCredit = true;
      controller.paymentDueDate = "30/02/2016";
      controller.addExpense();
        
      $rootScope.$apply();
        
      expect(controller.expenseAdded).toBe(true);
    })
    
    it('modifyExpense', function() {
      deferred.resolve(data);
    	
      controller.merchantName = "merchantTwo";
      controller.dateOfPurchase = "01/02/2016";
      controller.paidByCredit = true;
      controller.paymentDueDate = "30/04/2016";
      controller.modifyExpense();
        
      $rootScope.$apply();
        
      expect(controller.expenseModified).toBe(true);
    })
    
    it('deleteExpense', function() {
      deferred.resolve(data);
    	
      controller.deleteExpense();
        
      $rootScope.$apply();
        
      expect(controller.expenseDeleted).toBe(true);
    })
});