@echo off

echo Starting Face Login Project...

wt ^
new-tab --title "SERVER" cmd /k "cd /d %~dp0server && node server.js" ^
; new-tab --title "CLIENT" cmd /k "cd /d %~dp0client && npm run dev"
;

echo All applications started.