import prisma from "../config/prisma.js";

export async function criarVeiculo(data: {
    marca: string;
    modelo: string;
    ano: number;
    placa: string;
    valorDiaria: number;
}) {
    return prisma.veiculo.create({
        data: {
            marca: data.marca,
            modelo: data.modelo,
            ano: data.ano,
            placa: data.placa,
            valorDiaria: data.valorDiaria,
        },
    });
}

export async function atualizarVeiculo(
    id: number,
    data: Partial<{
        marca: string;
        modelo: string;
        ano: number;
        placa: string;
        valorDiaria: number;
    }>
) {
    return prisma.veiculo.update({
        where: { id },
        data,
    });
}

export async function deletarVeiculo(id: number) {
    return prisma.veiculo.delete({
        where: { id },
    });
}

export async function listaVeiculo() {
    return prisma.veiculo.findMany({
        orderBy: { id: "asc" },
    });
}

export async function buscarVeiculo(identificador: string) {
    const numerico = /^\d+$/.test(identificador);

    if (numerico) {
        return prisma.veiculo.findUnique({
            where: { id: Number(identificador) },
        });
    }

    return prisma.veiculo.findUnique({
        where: { placa: identificador },
    });
}