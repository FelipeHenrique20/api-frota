import { z } from "zod";

export const registrarSchema = z.object({
    nome: z.string().trim().min(1, "Nome é obrigatório"),
    email: z.email("E-mail inválido"),
    senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export const loginSchema = z.object({
    email: z.email("E-mail inválido"),
    senha: z.string().min(1, "Senha é obrigatória"),
});