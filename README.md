# contractus-app

[![LoopBack](<https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png>)](http://loopback.io/)

PRIMEIRAS VEZ: docker run -d -p 5432:5432 --name contractusapp-postgres -e POSTGRES_PASSWORD=contractusapp postgres
DEPOIS: docker start contractusapp-postgres

docker exec -it contractusapp-postgres bash

psql -U postgres
CREATE DATABASE contractusapp;
create user contractusapp with encrypted password 'contractusapp';
GRANT ALL PRIVILEGES ON DATABASE contractusapp TO contractusapp;

PARA ACESSAR COM PGAMDIN

PRIMEIRAS VEZ: docker run -d -p 5050:80 --name pgadmin -e PGADMIN_DEFAULT_EMAIL=pgadmin4@pgadmin.org -e PGADMIN_DEFAULT_PASSWORD=admin dpage/pgadmin4
DEPOIS: docker start pgadmin

PS: Caso ao adicionar no servidor comece a receber problemas ao tentar adicionar servidor em 'localhost'. use o docker network inspect para pegar o IPv4 e conectar através dele
