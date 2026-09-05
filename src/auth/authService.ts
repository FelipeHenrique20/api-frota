import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import { AppError } from "../errors/AppError.js";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function registrar(data: {
    nome: string;
    email: string;
    senha: string;
}) {
    const usuarioExistente = await prisma.usuario.findUnique({
        where: { email: data.email },
    });

    if (usuarioExistente) {
        throw new AppError("E-mail já cadastrado", 400);
    }

    const senhaCriptografada = await bcrypt.hash(data.senha, 10);

    const usuario = await prisma.usuario.create({
        data: {
            nome: data.nome,
            email: data.email,
            senha: senhaCriptografada,
        },
    });

    return { id: usuario.id, nome: usuario.nome, email: usuario.email };
}

export async function login(data: { email: string; senha: string }) {
    const usuario = await prisma.usuario.findUnique({
        where: { email: data.email },
    });

    if (!usuario) {
        throw new AppError("Credenciais inválidas", 401);
    }

    const senhaCorreta = await bcrypt.compare(data.senha, usuario.senha);

    if (!senhaCorreta) {
        throw new AppError("Credenciais inválidas", 401);
    }

    const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        JWT_SECRET,
        { expiresIn: "8h" }
    );

    return { token };
}