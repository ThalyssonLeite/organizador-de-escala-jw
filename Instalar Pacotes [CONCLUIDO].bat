cd %cd%/frontend

(npm install --global yarn && yarn install && (ren %0 "Instalar Pacotes [CONCLUÍDO].bat")) || (ren %0 "Instalar Pacotes [ERRO, CLIQUE DE NOVO].bat")