import type { Request, Response } from "express";
import { criarCliente, atualizarCliente, deletarCliente, listarClientes, buscarCliente } from "./clienteService.js"
import { AppError } from "../errors/AppError.js";

export async function criar(req: Request, res: Response) {
    const cliente = await criarCliente(req.body);
    res.status(201).json(cliente);
}

export async function atualizar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const cliente = await atualizarCliente(id, req.body);
    res.status(200).json(cliente);
}

export async function deletar(req: Request, res: Response) {
    const id = Number(req.params.id);
    await deletarCliente(id);
    res.status(204).send();
}

export async function listar(req: Request, res: Response) {
    const clientes = await listarClientes();
    res.status(200).json(clientes);
}

export async function buscar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const cliente = await buscarCliente(id);

    if (!cliente) {
        throw new AppError("Cliente não encontrado", 404);
    }
    res.status(200).json(cliente);
}