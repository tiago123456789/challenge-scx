Requisitos para rodar essa aplicação:
======================================

- Git 
- Node.js
- Npm
- Docker
- Docker compose

- Observações: para os desenvolvimento desse projeto eu usei as ferramentos dos requisitos acima nas versões que será citado abaixo, se ocorrei algum problema referente a versão das ferramentas utilizadas por você recomendo usar a versões citadas abaixo.
    - Git na versão 2.17.1
    - Node.js na versão v14.16.1
    - Npm na versão 6.14.12
    - Docker na versão 20.10.6
    - Docker compose na versão 1.21.2


Instruções para rodar o projeto:
=================================

- Clonar o projeto
- Acessar a raiz do projeto
- Criar um arquivo **.env** baseado no arquivo **.env.example**
- Executar o comando: **docker-compose up** para rodar o projeto. Após executar esse comando acesso o navegador no seguinte endereço: http://localhost:3000/ para que seja carregada a documentação usando **swagger** é assim você podera fazer o testes.
 - Arquivo com o diagrama do banco de dados está na raiz do projeto e está com o nome **diagrama-de-banco-de-dados.png** 

Instruções para rodar os testes do projeto:
============================================

- Clonar o projeto
- Acessar a raiz do projeto
- Criar um arquivo **.env** baseado no arquivo **.env.example**
- Executar o comando: **docker-compose -f docker-compose.testing.yml up** para rodar os  testes do projeto. 
