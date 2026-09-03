# 🚗 API Frota

API REST para gerenciamento de frota e aluguel de veículos, desenvolvida com **Node.js, Express, TypeScript e Prisma ORM (PostgreSQL)**.

O projeto tem como objetivo aplicar conceitos de desenvolvimento backend, como criação de APIs, modelagem de banco de dados relacional, organização de código, separação de responsabilidades, tratamento de erros e boas práticas utilizando TypeScript.

---

## 🚀 Sobre o projeto

A **API Frota** é uma API para gerenciamento de uma frota de veículos, permitindo controlar veículos, clientes e aluguéis.

O projeto foi desenvolvido com uma estrutura organizada, buscando aplicar conceitos utilizados em aplicações backend reais, como divisão de módulos por entidade, criação de rotas, integração com banco de dados via ORM e organização das regras da aplicação.

---

## ✨ Funcionalidades

Atualmente a API possui:

✅ Cadastro e gerenciamento de veículos
✅ Busca de veículo por ID ou placa (endpoint único)
✅ Atualização de registros
✅ Remoção de registros
✅ Listagem de veículos
✅ Tratamento global de erros da aplicação
✅ Integração com banco de dados PostgreSQL via Prisma ORM

🚧 Em desenvolvimento:

* [ ] Cadastro e gerenciamento de clientes
* [ ] Cadastro e controle de aluguéis (vínculo veículo/cliente com datas)

---

## 🛠️ Tecnologias utilizadas

* **Node.js**
* **Express 5**
* **TypeScript**
* **Prisma ORM 7**
* **PostgreSQL**
* **TSX**
* **Git e GitHub**

---

## 📦 Principais dependências

* **Express** — criação da API REST e gerenciamento das rotas
* **Prisma / @prisma/client / @prisma/adapter-pg** — ORM e conexão com o banco PostgreSQL
* **pg** — driver de conexão com PostgreSQL
* **dotenv** — gerenciamento de variáveis de ambiente
* **TypeScript** — tipagem estática e maior segurança no desenvolvimento
* **TSX** — execução do TypeScript em ambiente de desenvolvimento

---

## 📂 Estrutura do projeto

```
api-frota
│
├── prisma
│   ├── migrations
│   └── schema.prisma
│
├── src
│   ├── aluguel
│   ├── cliente
│   ├── config
│   ├── errors
│   ├── middlewares
│   ├── routes
│   ├── utils
│   ├── veiculo
│   ├── app.ts
│   └── server.ts
│
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
└── README.md
```

---

## 🏗️ Arquitetura do projeto

O projeto segue uma organização baseada na separação de responsabilidades, com módulos organizados por entidade (veículo, cliente, aluguel):

* **Routes:** definição dos endpoints da API
* **Controllers:** recebem as requisições e retornam as respostas
* **Services:** concentram as regras de negócio de cada módulo
* **Config:** configuração da conexão com o Prisma/banco de dados
* **Errors:** tratamento de erros personalizados (`AppError`)
* **Middlewares:** tratamento global de exceções da aplicação
* **Utils:** funções auxiliares reutilizáveis (ex: `asyncHandler`)

Essa estrutura facilita a manutenção e evolução do projeto.

---

## 🗄️ Modelagem do banco de dados

O banco de dados é modelado em PostgreSQL via Prisma ORM, com as seguintes entidades:

* **Veiculo** — marca, modelo, ano, placa (única), valor da diária e status (`DISPONIVEL`, `ALUGADO`, `MANUTENCAO`)
* **Cliente** — nome, email (único) e telefone
* **Aluguel** — vincula um veículo a um cliente, com data de início e data de fim (histórico de aluguéis por veículo)

---

## ⚙️ Como executar o projeto

### Pré-requisitos

Antes de iniciar, tenha instalado:

* Node.js
* npm
* PostgreSQL
* Git

---

### Clone o repositório

```bash
git clone https://github.com/FelipeHenrique20/api-frota.git
```

Entre na pasta:

```bash
cd api-frota
```

Instale as dependências:

```bash
npm install
```

Configure as variáveis de ambiente (crie um `.env` a partir do `.env.example`):

```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/api_frota?schema=public"
PORT=3000
```

Execute as migrations do Prisma:

```bash
npx prisma migrate dev
```

Execute o projeto:

```bash
npm run dev
```

A API estará disponível em:

```
http://localhost:3000
```

---

## 📌 Endpoints da API

### 🚗 Veículos

| Método | Endpoint                | Descrição                            |
| ------ | ------------------------ | ------------------------------------- |
| GET    | `/veiculos`               | Lista todos os veículos               |
| GET    | `/veiculos/:identificador`| Busca um veículo por ID ou placa      |
| POST   | `/veiculos`                | Cadastra um veículo                   |
| PUT    | `/veiculos/:id`            | Atualiza um veículo                   |
| DELETE | `/veiculos/:id`            | Remove um veículo                     |

### 👤 Clientes *(em desenvolvimento)*

| Método | Endpoint     | Descrição         |
| ------ | ------------ | ------------------ |
| GET    | `/clientes`  | Lista clientes      |
| POST   | `/clientes`  | Cadastra cliente    |

### 🔄 Aluguéis *(em desenvolvimento)*

| Método | Endpoint     | Descrição          |
| ------ | ------------ | -------------------- |
| GET    | `/alugueis`  | Lista aluguéis        |
| POST   | `/alugueis`  | Cria aluguel           |

---

## 🧠 Conceitos aplicados

Durante o desenvolvimento foram praticados:

* Desenvolvimento de API REST
* TypeScript com tipagem estática
* Modelagem de banco de dados relacional
* Uso de ORM (Prisma) com PostgreSQL
* Organização de projeto backend
* Criação de rotas HTTP
* Manipulação de requisições e respostas
* Separação de responsabilidades
* Tratamento global de erros
* Versionamento com Git

---

## 🔮 Próximas melhorias

Algumas melhorias planejadas:

* [ ] Finalizar módulos de cliente e aluguel
* [ ] Adicionar validação de campos
* [ ] Implementar autenticação JWT
* [ ] Documentar API com Swagger/OpenAPI
* [ ] Criar testes automatizados
* [ ] Realizar deploy da aplicação

---

## 👨‍💻 Autor

**Felipe Henrique**

GitHub:
https://github.com/FelipeHenrique20

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT.
