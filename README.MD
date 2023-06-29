Readme base para executar o projeto:

Execute em seu terminal, na pasta raiz do projeto:

docker-compose up -d --build

Caso queira criar o banco inicial da aplicação:

docker exec imersaosql-base-database-1 /usr/local/firebird/bin/isql -q -i /tmp/criar_banco.sql
