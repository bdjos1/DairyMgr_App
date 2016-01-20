describe('by model', function() {
  
   
  describe('site', function() {
    it('should do stuff', function() {
      expect(browser.getTitle()).toEqual('Farm Manager App');
      //expect(true).toBe(true);
	  browser.refresh();
	  
	   element(by.tagName("h1")).getText().then(function(text) {
            expect(text).toEqual('Welcome, Dairy Farm Manager!');
          });
	 
    });
	
	 it('test login', function() {
		 //browser.debugger();
		 
		  var loginAnchor = element(by.id('login')).element(by.tagName("a")).click();
		  
		  // Test Login text
		  element(by.tagName("h1")).getText().then(function(text) {
            expect(text).toEqual('Sign in');
          });
		  
		  var userNameField =  element(by.model('ctrl.credentials.username'));
		  var passwordField =  element(by.model('ctrl.credentials.password'));
		  var signInBtn = element(by.buttonText('Sign in'));
		  
		  userNameField.sendKeys(1);
          passwordField.sendKeys(2);

		  signInBtn.click();
		  
		  var loginText = element(by.id('loginError')).getText();
		  expect(loginText).toEqual('Failed to sign in! Please check your credentials and try again.');
		  
		   userNameField.clear();
          passwordField.clear();
		  
		  userNameField.sendKeys('user');
          passwordField.sendKeys('password');

		  signInBtn.click();
		  
		  var loginText = element(by.id('loginError')).getText();
		  expect(loginTextBlah).toEqual('Failed to sign in! Please check your credentials and try again.');
   });
});
});