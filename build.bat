set RC=
@echo off

setlocal

IF "%1" =="stopApp" (
  taskkill /F /PID %2
)

IF "%1" =="run" (
  call java -jar target\dairymanager-0.0.1-SNAPSHOT.war
)

IF "%1" =="webdriver" (
  call webdriver-manager start
)

goto END

rem  *********************
rem  ***  BUILD ERROR  ***
rem  *********************
:BUILDERROR
set ERRORLEVEL=1
goto END

rem  **************
rem  ***  EXIT  ***
rem  **************
:EXIT
exit /B %RC%

rem  *************
rem  ***  END  ***
rem  *************
:END
endlocal & set RC=%ERRORLEVEL%
call :EXIT %RC%