/* ************************************************************************************
server -> route -> controller -> service -> repository -> model

-> routes: endpoints da API, que direcionam as requisições para o controller.
-> controller: valida a requisição e chama o service para a lógica de negócios.
-> service: processa regras de negócios e executa ações (ex: calcular, enviar e-mail).
-> models: definem a estrutura dos dados a serem guardados  (ex: nome, email, cpf).
-> repositories: interagem com o banco de dados para salvar ou recuperar dados.
-> route/controller: devolvem a resposta ao cliente.
************************************************************************************ */
//executar: nodemon src/server.ts

import express, { Request, Response } from "express";
import router from './routes/routes';
import  cors from "cors";
import dotenv from "dotenv"
dotenv.config();

const server = express();
server.use(cors());
//autorizando que as minhas rotas acessem dados via POST
server.use(express.urlencoded({extended: true}));

server.use(express.json());
server.use(router);

server.use((req: Request, res: Response) => {
  res.status(404);
  res.json({error: "Route not found!"})
})

const porta = process.env.PORT;
server.listen(porta, () => {
  console.log(`http://localhost:${porta}`);
});
