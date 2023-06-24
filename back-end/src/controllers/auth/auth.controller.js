import { isEmailUsed } from "../../helper/auth";
import prisma from "../../libs/prisma";
import { createUser, loginUser } from "../../services/userService";
import { loginSchema, registerSchema } from "./auth.validation"

export const validateToken = async (req, res) => {
    return res.status(200).json({
        status: true,
        message: 'Token valid',
        data: {}
    })
}

export const login = async (req, res) => {
    const validator = loginSchema.validate(req.body)
    const data = validator.value
    if (validator.error) {
        return res.status(400).json({
            status: false,
            message: 'Data kurang, mohon dilengkapi',
            errors: validator.error.details
        }); 
    }

    res.json(await loginUser(data));
}

export const register = async (req, res) => {
    const validator = registerSchema.validate(req.body)
    const data = validator.value
    if (validator.error) {
        return res.status(400).json({
            status: false,
            message: 'Data kurang, mohon dilengkapi',
            errors: validator.error.details
        }); 
    }

    if (await isEmailUsed(data)) {
        return res.status(400).json({
            status: false,
            message: 'Email sudah digunakan',
            data: {}
        })
    }

    const user = await createUser(data)
    return res.status(200).json({
        status: true,
        message: 'Berhasil membuat user baru',
        data: user
    })

}