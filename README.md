# API de Frota e Aluguel de Veículos

API RESTful para gerenciamento de frota e sistema de aluguel de veículos, construída com Node.js, TypeScript, Express e PostgreSQL (via Prisma ORM).

🔗 **API em produção:** https://api-frota-cpvf.onrender.com
📄 **Documentação interativa (Swagger):** https://api-frota-cpvf.onrender.com/docs

> ⚠️ O serviço está hospedado no plano gratuito do Render, que "dorme" após 15 minutos de inatividade. A primeira requisição após um período ocioso pode levar até ~1 minuto para responder.

## Funcionalidades

- **Veículos**: cadastrar, editar, remover, listar todos e buscar por ID ou placa
- **Clientes**: cadastrar, editar, remover, listar e buscar por ID
- **Aluguéis**: alugar um veículo (com validação de disponibilidade), devolver, listar e buscar por ID
- **Autenticação**: registro e login de usuários com JWT
- **Validação** de dados de entrada em todas as rotas
- **Tratamento global de erros** com mensagens claras e status HTTP apropriados
- **Documentação** interativa via Swagger/OpenAPI

## Tecnologias

| Categoria | Tecnologia |
|---|---|
| Linguagem | TypeScript |
| Runtime | Node.js |
| Framework web | Express |
| Banco de dados | PostgreSQL |
| ORM | Prisma |
| Validação | Zod |
| Autenticação | JWT (jsonwebtoken) + bcryptjs |
| Documentação | Swagger UI |
| Hospedagem | Render |

## Regras de negócio

- Um veículo só pode ser alugado se estiver com status `DISPONIVEL`.
- Ao alugar um veículo, seu status muda automaticamente para `ALUGADO` (operação atômica via transação).
- Ao devolver, o status volta para `DISPONIVEL`.
- O histórico de aluguéis é mantido — um veículo pode ter vários aluguéis ao longo do tempo.
- Todas as rotas de veículos, clientes e aluguéis exigem autenticação via token JWT.

## Modelo de dados

```
Veiculo (id, marca, modelo, ano, placa, valorDiaria, status)
Cliente (id, nome, email, telefone)
Aluguel (id, veiculoId, clienteId, dataInicio, dataFim)
Usuario (id, nome, email, senha)
```

`status` do veículo: `DISPONIVEL` | `ALUGADO` | `MANUTENCAO`

## Como rodar localmente

### Pré-requisitos
- Node.js
- PostgreSQL

### Passos

```bash
# 1. Clonar o repositório
git clone https://github.com/FelipeHenrique20/api-frota.git
cd api-frota

# 2. Instalar as dependências
npm install

# 3. Configurar as variáveis de ambiente
copy .env.example .env
# edite o .env com sua DATABASE_URL e JWT_SECRET

# 4. Rodar as migrations
npx prisma migrate deploy
npx prisma generate

# 5. Iniciar o servidor em modo desenvolvimento
npm run dev
```

O servidor sobe em `http://localhost:3000`. A documentação fica disponível em `http://localhost:3000/docs`.

### Build de produção

```bash
npm run build
npm start
```

## Principais endpoints

| Método | Rota | Descrição | Autenticação |
|---|---|---|---|
| POST | `/auth/registrar` | Registrar novo usuário | Não |
| POST | `/auth/login` | Login e obtenção do token JWT | Não |
| GET | `/veiculos` | Listar veículos | Sim |
| POST | `/veiculos` | Cadastrar veículo | Sim |
| GET | `/veiculos/:id` | Buscar veículo por ID ou placa | Sim |
| PUT | `/veiculos/:id` | Atualizar veículo | Sim |
| DELETE | `/veiculos/:id` | Remover veículo | Sim |
| GET | `/clientes` | Listar clientes | Sim |
| POST | `/clientes` | Cadastrar cliente | Sim |
| GET/PUT/DELETE | `/clientes/:id` | Buscar, atualizar ou remover cliente | Sim |
| GET | `/alugueis` | Listar aluguéis | Sim |
| POST | `/alugueis` | Alugar um veículo | Sim |
| GET | `/alugueis/:id` | Buscar aluguel por ID | Sim |
| PATCH | `/alugueis/:id/devolver` | Devolver o veículo | Sim |

Para rotas autenticadas, envie o header:
```
Authorization: Bearer <seu_token_jwt>
```

Consulte a [documentação completa](https://api-frota-cpvf.onrender.com/docs) para ver todos os parâmetros, exemplos de request/response e testar diretamente pelo navegador.

## Estrutura do projeto

```
src/
├── auth/          # Registro e login
├── veiculo/       # CRUD de veículos
├── cliente/       # CRUD de clientes
├── aluguel/       # Aluguel e devolução
├── config/        # Configuração do Prisma Client
├── docs/          # Especificação OpenAPI
├── errors/        # Classe de erro customizada (AppError)
├── middlewares/    # Autenticação, validação e tratamento global de erros
├── routes/        # Agregador de rotas
├── utils/         # Utilitários (asyncHandler)
├── app.ts         # Configuração da aplicação Express
└── server.ts      # Ponto de entrada
```

## Autor

**Felipe Henrique Sousa Filgueira**
Estudante de Engenharia de Software — UFC

- GitHub: [FelipeHenrique20](https://github.com/FelipeHenrique20)
- LinkedIn: [felipe-henrique-732006273](https://www.linkedin.com/in/felipe-henrique-732006273)
