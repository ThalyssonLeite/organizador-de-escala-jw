cd %cd%/dados
start "" http://localhost:5000
taskkill /im node.exe /F
node ./node_modules/pm2/bin/pm2 start deploy.json
