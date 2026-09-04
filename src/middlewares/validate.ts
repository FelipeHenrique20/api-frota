import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";
import { AppError } from "../errors/AppError.js";

export function validate(schema: ZodType) {
    return (req: Request, res: Response, next: NextFunction) => {
        const resultado = schema.safeParse(req.body);

        if (!resultado.success) {
            const mensagens = resultado.error.issues.map(
                (issue) => `${issue.path.join(".")}: ${issue.message}`
            );
            throw new AppError(mensagens.join(" | "), 400);
        }

        req.body = resultado.data;
        next();
    };
}