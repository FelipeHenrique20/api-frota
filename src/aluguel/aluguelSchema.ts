import { z } from "zod";

export const criarAluguelSchema = z.object({
    veiculoId: z.number().int().positive("veiculoId deve ser um número positivo"),
    clienteId: z.number().int().positive("clienteId deve ser um número positivo"),
    dataInicio: z.iso.date("dataInicio deve ser uma data válida (YYYY-MM-DD)"),
    dataFim: z.iso.date("dataFim deve ser uma data válida (YYYY-MM-DD)"),
});