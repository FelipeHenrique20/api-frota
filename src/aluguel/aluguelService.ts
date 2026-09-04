import prisma from "../config/prisma.js";
import { AppError } from "../errors/AppError.js";

export async function criarAluguel(data: {
    veiculoId: number;
    clienteId: number;
    dataInicio: Date;
    dataFim: Date;
}) {
    const veiculo = await prisma.veiculo.findUnique({
        where: { id: data.veiculoId },
    });

    if (!veiculo) {
        throw new AppError("Veículo não encontrado", 404);
    }

    if (veiculo.status !== "DISPONIVEL") {
        throw new AppError(`Veículo não está disponível para aluguel (status atual: ${veiculo.status})`, 400);
    }

    const cliente = await prisma.cliente.findUnique({
        where: { id: data.clienteId },
    });

    if (!cliente) {
        throw new AppError("Cliente não encontrado", 404);
    }

    if (data.dataFim <= data.dataInicio) {
        throw new AppError("Data de fim deve ser posterior à data de início", 400);
    }

    return prisma.$transaction(async (tx) => {
        const aluguel = await tx.aluguel.create({
            data: {
                veiculoId: data.veiculoId,
                clienteId: data.clienteId,
                dataInicio: data.dataInicio,
                dataFim: data.dataFim,
            },
        });

        await tx.veiculo.update({
            where: { id: data.veiculoId },
            data: { status: "ALUGADO" },
        });

        return aluguel;
    });
}

export async function devolverVeiculo(aluguelId: number) {
    const aluguel = await prisma.aluguel.findUnique({
        where: { id: aluguelId },
    });

    if (!aluguel) {
        throw new AppError("Aluguel não encontrado", 404);
    }

    return prisma.veiculo.update({
        where: { id: aluguel.veiculoId },
        data: { status: "DISPONIVEL" },
    });
}

export async function listarAlugueis() {
    return prisma.aluguel.findMany({
        orderBy: { id: "asc" },
        include: { veiculo: true, cliente: true },
    });
}

export async function buscarAluguel(id: number) {
    return prisma.aluguel.findUnique({
        where: { id },
        include: { veiculo: true, cliente: true },
    });
}