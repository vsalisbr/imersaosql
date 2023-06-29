# README - Execução do Projeto

Este é um guia básico para executar o projeto. Certifique-se de ter o Docker instalado em sua máquina antes de começar.

## Pré-requisitos

- Docker instalado: [Instruções de instalação do Docker](https://docs.docker.com/get-docker/)

## Passos para execução

1. Abra o terminal em sua máquina.
2. Navegue até a pasta raiz do projeto onde se encontra o arquivo `docker-compose.yml`.
3. Execute o seguinte comando para construir e executar os contêineres do projeto em segundo plano:

   ```bash
   docker-compose up -d --build
   ```

   Isso criará e iniciará os contêineres definidos no arquivo `docker-compose.yml`.

4. Caso queira criar o banco de dados inicial da aplicação, execute o seguinte comando:

   ```bash
   docker exec imersaosql-base-database-1 /usr/local/firebird/bin/isql -q -i /tmp/criar_banco.sql
   ```

   Este comando executa um script SQL para criar o banco de dados inicial da aplicação no contêiner do banco de dados.

Após a conclusão desses passos, o projeto estará em execução com os contêineres configurados corretamente. Você pode acessar a aplicação conforme necessário.

Acesse o frontend em: http://localhost:9080/
