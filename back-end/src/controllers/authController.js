import prisma from "../libs/prisma";
import { createUser, loginUser } from "../services/userService";
import { loginSchema, registerSchema } from "./authController.validation"

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
        return res.status(200).json({
            status: false,
            message: 'Field missing',
            errors: validator.error.details
        }); 
    }

    res.json(await loginUser(data.username, data.password));
}

const isEmailUsed = async (data) => {
    const isExist = await prisma.user.findUnique({
        where: {email: data.email}
    })

    return isExist
}

const isUsernameUsed = async (data) => {
    const isExist = await prisma.user.findUnique({
        where: {username: data.username}
    })
    return isExist
}

export const register = async (req, res) => {
    const validator = registerSchema.validate(req.body)
    const data = validator.value
    if (validator.error) {
        return res.status(200).json({
            status: false,
            message: 'Field missing',
            errors: validator.error.details
        }); 
    }

    if (await isEmailUsed(data)) {
        return res.status(200).json({
            status: false,
            message: 'Email already Used',
            data: {}
        })
    }

    if (await isUsernameUsed(data)) {
        return res.status(200).json({
            status: false,
            message: 'Username already Used',
            data: {}
        })
    }

    const user = await createUser(data.username,data.email, data.name, data.password)
    return res.status(200).json({
        status: true,
        message: 'Success created new user',
        data: user
    })

}