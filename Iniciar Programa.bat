cd %cd%/frontend
taskkill /im node.exe /F
node ./node_modules/pm2/bin/pm2 start deploy.json
start "" http://localhost:3000