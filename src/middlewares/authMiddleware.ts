import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError.js";

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface RequestComUsuario extends Request {
    usuario?: { id: number; email: string };
}

export function autenticar(
    req: RequestComUsuario,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token não fornecido", 401);
    }

    const [tipo, token] = authHeader.split(" ");

    if (tipo !== "Bearer" || !token) {
        throw new AppError("Formato de token inválido", 401);
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET) as {
            id: number;
            email: string;
        };
        req.usuario = payload;
        next();
    } catch {
        throw new AppError("Token inválido ou expirado", 401);
    }
}