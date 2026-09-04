import { z } from "zod";

export const criarVeiculoSchema = z.object({
    marca: z.string().trim().min(1, "Marca é obrigatória"),
    modelo: z.string().trim().min(1, "Modelo é obrigatório"),
    ano: z.number().int("Ano deve ser um número inteiro").min(1950, "Ano inválido").max(new Date().getFullYear() + 1, "Ano não pode ser no futuro distante"),
    placa: z.string().trim().toUpperCase().regex(/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/, "Placa inválida (formato esperado: ABC1234 OU ABC1D23)"),
    valorDiaria: z.number().positive("Valor da diária deve ser positivo"),
});

export const atualizarVeiculoSchema = criarVeiculoSchema.partial();