# Configuração de Variáveis de Ambiente - Projeto prático do curso "O Novo Programador".

Adicione as variáveis de ambiente abaixo no seu arquivo `.env` para configurar a aplicação:

- `PORT`: Porta onde o servidor irá rodar.
- `JWT_SECRET`: Chave secreta para assinatura de tokens JWT.
- `JWT_TOKEN_EXPIRES_IN`: Tempo de expiração do token JWT.
- `JWT_REFRESH_TOKEN_EXPIRES_IN`: Tempo de expiração do token de refresh JWT.
- `DATABASE_URL`: URL de conexão com o banco de dados MySQL, configurada para uso com Docker e Prisma.

  Exemplo:
  ```plaintext
  DATABASE_URL="mysql://username:password@localhost:porta/banco"
