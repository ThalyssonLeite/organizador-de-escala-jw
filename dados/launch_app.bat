cd %cd%/dados
start "" http://localhost:3000
taskkill /im node.exe /F
call npm start
