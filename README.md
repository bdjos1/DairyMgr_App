# DairyMgr_App
Project Overview
--------------------
Just a simple application that assists a farmer or farm manager in managaing a dairy farm. The idea is that the user (farmer/farm manager) can enter data into the application such as receipts (expenses/income), inventory e.t.c, and the application will provide analytical information to them which will help them make key business decisions about the farm going into the future.

Technology Overview
--------------------
The backend is Spring Boot (1.2.7) with a H2 database. The backend is pretty simplistic in that it just creates a restful service and inserts one expense into the application on application start up.
The frontend is written in AngularJS (1.4.8) and Bootstrap (3.3.5). OAuth 2.0 is used for Authorization.
The focus for this project was on the frontend of the application to learn about AngularJS and Bootstrap.

Jasmine is used for unit testing and Protractor is used for end to end testing (limited tests)

Features of the Application
---------------------------
Authentication (Login/Logout) & Authoriztion.
Globalization. Locale Selector to chooose English or French. Default is the former.
Display a list of expense receipts to the user and allows them to add/edit/delete a receipt.

Dependencies
--------------
Bower (please see here for further details : https://bower.io/)
Java 8 (please see here for installation details: http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
Maven (please see here for installation details: https://maven.apache.org/install.html)


Instrcutions for Running Application
-------------------------------------


