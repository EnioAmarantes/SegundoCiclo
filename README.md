# SegundoCiclo
Segundo ciclo de atividades para obtenção de notas para o curso de Engenharia de Software da matéria de Programação Web 2

comandos para executar o projeto

Primeiramente levantar o banco de dados mongo

Rodar o Mongo
> docker run -name mgdb -dp 27017:27017 -d mongo
> docker exec -it mgdb bash
> mongo
> use livraria

Instalar dependências do Backend e iniciar
> cd server
> npm install
> npm start

Instalar dependências do FrontEnd e iniciar
> cd client
> npm install
> npm start

Estará funcionando o CRUD para Livraria e Autores

Não foi possível concluir no projeto
Autorização, login e controle de login para o backend e o frontend bem como a inserção de no mínimo 5 itens para cada item dos cruds
