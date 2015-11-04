/* jshint -W117, -W030 */
describe('expenses.dataservice', function () {

    beforeEach(module('shared.expenses'));
    var $httpBackend;
    var expenseData;
    var mockDataService;
    
    
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	$httpBackend.when('GET', '/expenses').respond(
    	  {
    	    id: 2,
    	    name: "Expense2",
    	  }
    	);
    }));
    
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

    describe('expensesDataService', function() {
    	
        it('getExpenses', inject(function(expensesDataService) {
        	expensesDataService.getExpenses().then(function (data) {
        		expenseData = data;
            });
            $httpBackend.flush();
            expect(expenseData.data.id).toBe(2);
        }))
        
        it('addExpense', inject(function(expensesDataService) {
        	 var dataObj = {
			   trading_name : "name1",
	         };
        	 $httpBackend.expectPOST('/expenses/add', dataObj).respond(201, '');
        	 expensesDataService.addExpense(dataObj);
        	 $httpBackend.flush();
        }))
    })

});