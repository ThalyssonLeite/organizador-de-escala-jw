cd %cd%/frontend
start "" http://localhost:3000
taskkill /im node.exe /F
node ./node_modules/pm2/bin/pm2 start deploy.json
