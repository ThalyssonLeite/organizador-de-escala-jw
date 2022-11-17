cd %cd%/dados

((npm install --global yarn) && (yarn install) && (yarn build) && (del %0)) || (ren %0 "Instalar Pacotes [ERRO, CLIQUE DE NOVO].bat")