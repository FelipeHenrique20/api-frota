import type { Request, Response } from "express";
import { criarAluguel, devolverVeiculo, listarAlugueis, buscarAluguel } from "./aluguelService.js";
import { AppError } from "../errors/AppError.js";

export async function criar(req: Request, res: Response) {
    const { veiculoId, clienteId, dataInicio, dataFim } = req.body;

    const aluguel = await criarAluguel({
        veiculoId: Number(veiculoId),
        clienteId: Number(clienteId),
        dataInicio: new Date(dataInicio),
        dataFim: new Date(dataFim),
    });

    res.status(201).json(aluguel);
}

export async function devolver(req: Request, res: Response) {
    const id = Number(req.params.id);
    const veiculo = await devolverVeiculo(id);
    res.status(200).json(veiculo);
}

export async function listar(req: Request, res: Response) {
    const alugueis = await listarAlugueis();
    res.status(200).json(alugueis);
}

export async function buscar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const aluguel = await buscarAluguel(id);

    if (!aluguel) {
        throw new AppError("Aluguel não encontrado", 404);
    }
    res.status(200).json(aluguel);
}