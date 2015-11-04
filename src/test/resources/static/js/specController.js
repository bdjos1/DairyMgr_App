/* jshint -W117, -W030 */
describe('expenses.controller', function () {

    beforeEach(module('shared.expenses'));
    var deferred;
    var $controller;
   
    
    /*beforeEach(function() {
      dataServiceStub = sinon.stub({getExpenses: function() {
        console.log(arguments);
      }});
      dataServiceStub.getExpenses.returns('tyyiu');
    	 
      module(function($provide) {
       $provide.value('dataservice', dataServiceStub);
      })
    });*/
    debugger;
    beforeEach(inject(function(_$q_, _$rootScope_,$injector) {
    	debugger;
        $rootScope = _$rootScope_;
        deferred = _$q_.defer();
        //inject( function($injector){
            $controller = $injector.get('$controller');
        //});
      }));
        
    it('expenses', function() {
    	var dataservice = {};
    	dataservice.getExpenses = function() {};
        var spy = spyOn(dataservice, 'getExpenses').and.returnValue(deferred.promise);
        debugger;
        var controller = $controller('expensesController', { 
          $scope: $rootScope, 
          dataservice: dataservice
        });

        deferred.resolve('Returned OK!');

        $rootScope.$apply();
        
        expect(controller.expenses).toBe('Returned OK!');
    })
});