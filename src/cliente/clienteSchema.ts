import { z } from "zod";

export const criarClienteSchema = z.object({
    nome: z.string().trim().min(1, "Nome é obrigatório"),
    email: z.email("E-mail inválido"),
    telefone: z.string().trim().min(8, "Telefone inválido").optional(),
});

export const atualizarClienteSchema = criarClienteSchema.partial();