/* jshint -W117, -W030 */
describe('dataservice', function () {

    beforeEach(module('shared.expenses'));
    var $httpBackend;
    var expenseData;
    var mockDataService;
    
    
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    }));
    
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

    describe('dataservice', function() {
    	
        it('getApplicationData', inject(function(dataservice) {
        	var getApplicationDataErrMsg;
        	$httpBackend.when('GET', '/expenses').respond(
        	{
        	  id: 2,
        	  name: "Expense2",
        	});
        	dataservice.getApplicationData('/expenses').then(function (data) {
        		expenseData = data;
            });
            $httpBackend.flush();
            expect(expenseData.data.id).toBe(2);
            expect(expenseData.data.name).toBe("Expense2");
            
            
            $httpBackend.when("GET", '/expenses2')
              .respond(500, {id: 2, name: "Expense2"});
            dataservice.getApplicationData('/expenses2', "Expenses").then(function (e) {
            	getApplicationDataErrMsg = e;
            });
            $httpBackend.flush();
            
            expect(getApplicationDataErrMsg).toBe('Failed to get Expenses.');
            
        }))
        
        it('addApplicationData', inject(function(dataservice) {
        	var url = '/expenses/add';
        	 var dataObj = {
			   "trading_name" : "name1",
	         };
        	 $httpBackend.expectPOST(url, dataObj).respond(500, '');
        	 specHelper.fakePostRequest(dataservice, dataservice.addApplicationData, url, dataObj, "Expense");
        	 $httpBackend.flush();
        	 expect(specHelper.responseData).toBe('Failed to add Expense ' + JSON.stringify(dataObj));
        	 
        	 $httpBackend.expectPOST(url, dataObj).respond(200, dataObj);
        	 specHelper.fakePostRequest(dataservice, dataservice.addApplicationData, url, dataObj);
        	 $httpBackend.flush();
        	 var response = specHelper.responseData;
        	 expect(response.trading_name).toBe(dataObj.trading_name);
        }))
        
         it('modifyApplicationData', inject(function(dataservice) {
        	var url = '/expenses/update';
        	 var updatedObject = {
			   "trading_name" : "name2",
	         };
        	 $httpBackend.expectPUT(url, updatedObject).respond(500, '');
        	 specHelper.fakePostRequest(dataservice, dataservice.modifyApplicationData, url, updatedObject, "Expense");
        	 $httpBackend.flush();
        	 expect(specHelper.responseData).toBe('Failed to update Expense ' + JSON.stringify(updatedObject) + '. Perhaps the identifier is incorrect.');
        	 
        	 $httpBackend.expectPUT(url, updatedObject).respond(200, updatedObject);
        	 specHelper.fakePostRequest(dataservice, dataservice.modifyApplicationData, url, updatedObject);
        	 $httpBackend.flush();
        	 var response = specHelper.responseData;
        	 expect(response.trading_name).toBe(updatedObject.trading_name);
        }))
        
        it('deleteApplicationData', inject(function(dataservice) {
        	var url = '/expenses/delete';
        	 var objectToDelete = {
			   "trading_name" : "name2",
	         };
        	 $httpBackend.expectDELETE(url, {"Accept":"application/json, text/plain, */*"}).respond(500, '');
        	 specHelper.fakePostRequest(dataservice, dataservice.deleteApplicationData, url, objectToDelete, "Expense");
        	 $httpBackend.flush();
        	 expect(specHelper.responseData).toBe('Failed to delete Expense {"trading_name":"name2","method":"delete","url":"/expenses/delete"}. Perhaps this item no longer exists.');
        	 
        	 $httpBackend.expectDELETE(url, {"Accept":"application/json, text/plain, */*"}).respond(200, '');
        	 specHelper.fakePostRequest(dataservice, dataservice.deleteApplicationData, url, objectToDelete);
        	 $httpBackend.flush();
        	 expect(specHelper.responseData).toBe('');
        }))
    })
});