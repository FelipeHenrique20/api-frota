export const openapiSpec = {
  openapi: "3.0.0",
  info: {
    title: "API de Frota e Aluguel de Veículos",
    version: "1.0.0",
    description:
      "API RESTful para gerenciamento de frota e sistema de aluguel de veículos.",
  },
  servers: [
    { url: "http://localhost:3000", description: "Ambiente local" },
    {
      url: "https://api-frota-cpvf.onrender.com",
      description: "Produção (Render)",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      Veiculo: {
        type: "object",
        properties: {
          id: { type: "integer" },
          marca: { type: "string" },
          modelo: { type: "string" },
          ano: { type: "integer" },
          placa: { type: "string" },
          valorDiaria: { type: "string" },
          status: {
            type: "string",
            enum: ["DISPONIVEL", "ALUGADO", "MANUTENCAO"],
          },
        },
      },
      Cliente: {
        type: "object",
        properties: {
          id: { type: "integer" },
          nome: { type: "string" },
          email: { type: "string" },
          telefone: { type: "string" },
        },
      },
      Aluguel: {
        type: "object",
        properties: {
          id: { type: "integer" },
          veiculoId: { type: "integer" },
          clienteId: { type: "integer" },
          dataInicio: { type: "string", format: "date-time" },
          dataFim: { type: "string", format: "date-time" },
        },
      },
      Erro: {
        type: "object",
        properties: {
          error: { type: "string" },
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
  paths: {
    "/auth/registrar": {
      post: {
        tags: ["Auth"],
        summary: "Registrar novo usuário",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["nome", "email", "senha"],
                properties: {
                  nome: { type: "string" },
                  email: { type: "string" },
                  senha: { type: "string", minLength: 6 },
                },
              },
            },
          },
        },
        responses: {
          "201": { description: "Usuário criado com sucesso" },
          "400": {
            description: "Dados inválidos ou e-mail já cadastrado",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Erro" } },
            },
          },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Autenticar usuário e obter token JWT",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "senha"],
                properties: {
                  email: { type: "string" },
                  senha: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Login bem-sucedido, retorna o token JWT",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { token: { type: "string" } },
                },
              },
            },
          },
          "401": {
            description: "Credenciais inválidas",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Erro" } },
            },
          },
        },
      },
    },
    "/veiculos": {
      get: {
        tags: ["Veículos"],
        summary: "Listar todos os veículos",
        responses: {
          "200": {
            description: "Lista de veículos",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Veiculo" },
                },
              },
            },
          },
          "401": { description: "Token não fornecido ou inválido" },
        },
      },
      post: {
        tags: ["Veículos"],
        summary: "Cadastrar um novo veículo",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["marca", "modelo", "ano", "placa", "valorDiaria"],
                properties: {
                  marca: { type: "string" },
                  modelo: { type: "string" },
                  ano: { type: "integer" },
                  placa: { type: "string", example: "ABC1234" },
                  valorDiaria: { type: "number" },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Veículo criado",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Veiculo" } },
            },
          },
          "400": { description: "Dados inválidos" },
          "401": { description: "Token não fornecido ou inválido" },
        },
      },
    },
    "/veiculos/{id}": {
      get: {
        tags: ["Veículos"],
        summary: "Buscar veículo por ID ou placa",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID numérico ou placa do veículo",
          },
        ],
        responses: {
          "200": {
            description: "Veículo encontrado",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Veiculo" } },
            },
          },
          "404": { description: "Veículo não encontrado" },
        },
      },
      put: {
        tags: ["Veículos"],
        summary: "Atualizar um veículo existente",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Veiculo" },
            },
          },
        },
        responses: {
          "200": { description: "Veículo atualizado" },
          "400": { description: "Dados inválidos" },
        },
      },
      delete: {
        tags: ["Veículos"],
        summary: "Remover um veículo",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        responses: {
          "204": { description: "Veículo removido com sucesso" },
        },
      },
    },
    "/clientes": {
      get: {
        tags: ["Clientes"],
        summary: "Listar todos os clientes",
        responses: {
          "200": {
            description: "Lista de clientes",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/Cliente" } },
              },
            },
          },
        },
      },
      post: {
        tags: ["Clientes"],
        summary: "Cadastrar um novo cliente",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["nome", "email"],
                properties: {
                  nome: { type: "string" },
                  email: { type: "string" },
                  telefone: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "201": { description: "Cliente criado" },
          "400": { description: "Dados inválidos" },
        },
      },
    },
    "/clientes/{id}": {
      get: {
        tags: ["Clientes"],
        summary: "Buscar cliente por ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        responses: {
          "200": { description: "Cliente encontrado" },
          "404": { description: "Cliente não encontrado" },
        },
      },
      put: {
        tags: ["Clientes"],
        summary: "Atualizar um cliente existente",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        responses: {
          "200": { description: "Cliente atualizado" },
        },
      },
      delete: {
        tags: ["Clientes"],
        summary: "Remover um cliente",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        responses: {
          "204": { description: "Cliente removido" },
        },
      },
    },
    "/alugueis": {
      get: {
        tags: ["Aluguéis"],
        summary: "Listar todos os aluguéis",
        responses: {
          "200": {
            description: "Lista de aluguéis",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/Aluguel" } },
              },
            },
          },
        },
      },
      post: {
        tags: ["Aluguéis"],
        summary: "Alugar um veículo",
        description:
          "Cria um novo aluguel e muda o status do veículo para ALUGADO. Falha com 400 se o veículo não estiver disponível.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["veiculoId", "clienteId", "dataInicio", "dataFim"],
                properties: {
                  veiculoId: { type: "integer" },
                  clienteId: { type: "integer" },
                  dataInicio: { type: "string", format: "date", example: "2026-09-10" },
                  dataFim: { type: "string", format: "date", example: "2026-09-15" },
                },
              },
            },
          },
        },
        responses: {
          "201": { description: "Aluguel criado" },
          "400": { description: "Veículo indisponível ou datas inválidas" },
          "404": { description: "Veículo ou cliente não encontrado" },
        },
      },
    },
    "/alugueis/{id}": {
      get: {
        tags: ["Aluguéis"],
        summary: "Buscar aluguel por ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        responses: {
          "200": { description: "Aluguel encontrado" },
          "404": { description: "Aluguel não encontrado" },
        },
      },
    },
    "/alugueis/{id}/devolver": {
      patch: {
        tags: ["Aluguéis"],
        summary: "Devolver o veículo (finalizar aluguel)",
        description: "Muda o status do veículo de volta para DISPONIVEL.",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        responses: {
          "200": {
            description: "Veículo devolvido com sucesso",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Veiculo" } },
            },
          },
          "404": { description: "Aluguel não encontrado" },
        },
      },
    },
  },
};