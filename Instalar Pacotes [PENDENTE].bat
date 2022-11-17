cd %cd%/dados

((npm install --global yarn) && (npm install --global pm2) && (yarn install) && (yarn build) && (del %0)) || (ren %0 "Instalar Pacotes [ERRO, CLIQUE DE NOVO].bat")