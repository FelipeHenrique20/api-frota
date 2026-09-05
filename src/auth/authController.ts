import type { Request, Response } from "express";
import { registrar as registrarService, login as loginService } from "./authService.js";

export async function registrar(req: Request, res: Response) {
    const usuario = await registrarService(req.body);
    res.status(201).json(usuario);
}

export async function login(req: Request, res: Response) {
    const resultado = await loginService(req.body);
    res.status(200).json(resultado);
}