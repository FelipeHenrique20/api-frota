import prisma from "../config/prisma.js";

export async function criarCliente(data: {
    nome: string;
    email: string;
    telefone?: string;
}) {
    return prisma.cliente.create({
        data: {
            nome: data.nome,
            email: data.email,
            telefone: data.telefone ?? null,
        },
    });
}

export async function atualizarCliente(
    id: number,
    data: Partial<{
        nome: string;
        email: string;
        telefone: string;
    }>
) {
    return prisma.cliente.update({
        where: { id },
        data,
    });
}

export async function deletarCliente(id: number) {
    return prisma.cliente.delete({
        where: { id },
    });
}

export async function listarClientes() {
    return prisma.cliente.findMany({
        orderBy: { id: "asc" },
    });
}

export async function buscarCliente(id: number) {
    return prisma.cliente.findUnique({
        where: { id },
    });
}