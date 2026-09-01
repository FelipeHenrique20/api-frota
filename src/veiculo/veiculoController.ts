import type { Request, Response } from "express";
import { criarVeiculo, atualizarVeiculo, deletarVeiculo, listaVeiculo, buscarVeiculo } from "./veiculoService.js"
import { AppError } from "../errors/AppError.js";

export async function criar(req: Request, res: Response) {
    const veiculo = await criarVeiculo(req.body);
    res.status(201).json(veiculo);
}

export async function atualizar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const veiculo = await atualizarVeiculo(id, req.body);
    res.status(200).json(veiculo);
}

export async function deletar(req: Request, res: Response) {
    const id = Number(req.params.id);
    await deletarVeiculo(id);
    res.status(204).send();
}

export async function listar(req: Request, res: Response) {
    const veiculos = await listaVeiculo();
    res.status(200).json(veiculos);
}

export async function buscar(req: Request, res: Response) {
    const veiculo = await buscarVeiculo(req.params.identificador as string);

    if (!veiculo) {
        throw new AppError("Veículo não encontrado", 404);
    }

    res.status(200).json(veiculo);
}