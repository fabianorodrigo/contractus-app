# contractus-app: Sistema de gestão de contratos administrativos de Tecnologia da Informação

## POSTGRES

### PRIMEIRAS VEZ - CRIAÇÃO

- docker run -d -p 5432:5432 --name contractusapp-postgres -e POSTGRES_PASSWORD=contractusapp postgres # apenas ambiente de teste, para produção, ao uma solução com Docker Compose deve ser provida para os dados serem persistidos em um diretório específico, com backup, etc

- docker exec -it contractusapp-postgres bash

  - psql -U postgres
    - \<Executar comandos em setup\/database\/0\.pre-DDL\.sql\>
    - exit
  - exit
- npm run migrate
- npm start

PS: Caso ao adicionar no servidor comece a receber problemas ao tentar adicionar servidor em 'localhost'. use o docker network inspect para pegar o IPv4 e conectar através dele

//ESQUECE, NÃO DEU CERTO: Executar comandos contidos nos arquivos SQL da pasta "setup/database"

### DEPOIS - REUTILIZANDO O CONTAINER

- docker start contractusapp-postgres
- npm start

## PGADMIN

### PRIMEIRAS VEZ - CRIAÇÃO

- docker run -d -p 5050:80 --name pgadmin -e PGADMIN_DEFAULT_EMAIL=pgadmin4@pgadmin.org -e PGADMIN_DEFAULT_PASSWORD=admin dpage/pgadmin4

### DEPOIS - REUTILIZANDO O CONTAINER

- docker start pgadmin


