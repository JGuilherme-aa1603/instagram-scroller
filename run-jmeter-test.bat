@echo off
echo ========================================
echo   Instagram Scroller - Teste de Carga
echo ========================================
echo.
echo Iniciando JMeter...
echo.

REM Executar teste JMeter
apache-jmeter-5.6.3\apache-jmeter-5.6.3\bin\jmeter.bat -n -t jmeter-tests\API-LoadTest.jmx -l jmeter-tests\results.jtl

echo.
echo ========================================
echo   Teste Concluido!
echo ========================================
echo.
echo Resultados salvos em: jmeter-tests\results.jtl
echo.
pause
