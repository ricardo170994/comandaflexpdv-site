@echo off
setlocal
powershell -ExecutionPolicy Bypass -File "%~dp0preview-pages.ps1" %*
