@echo off
setlocal
powershell -ExecutionPolicy Bypass -File "%~dp0sync-githubpages.ps1" %*
