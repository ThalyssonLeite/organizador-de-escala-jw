cd %cd%/dados
start "" http://localhost:3000
taskkill /im node.exe /F
call pm2 start ./node_modules/next/dist/bin/next start
