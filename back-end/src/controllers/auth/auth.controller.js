import { isEmailUsed } from "../../helper/auth";
import prisma from "../../libs/prisma";
import { createUser, getToken, loginUser, updateProfile } from "../../services/userService";
import { loginSchema, registerSchema, updateProfileSchema } from "./auth.validation"
import bcrypt from 'bcrypt'

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

export const updateUser = async (req, res) => {
    const validator = updateProfileSchema.validate(req.body)
    const data = validator.value
    if (validator.error) {
        return res.status(400).json({
            status: false,
            message: 'Data kurang, mohon dilengkapi',
            errors: validator.error.details
        });    
    }

    if (data.password && data.oldPassword) {
        console.log('sini');
        try {
            const user = await prisma.user.findUnique({where:{ id: req.user.id }})
            // console.log(bcrypt.compare(data.oldPassword, user.password));
            if (!bcrypt.compareSync(data.oldPassword, user.password)) {
                return res.status(401).json({
                    status: false,
                    message: 'Password lama tidak sesuai',
                    data: {}
                })
            }
            delete data.oldPassword
            data.password = await bcrypt.hash(data.password, 10);
        } catch (error) {
            console.log(error);
        }
    }
    const updatedUser = await updateProfile(req.user.id, data);
    return res.status(200).json({
        status: true,
        message: 'Berhasil update user',
        data: updatedUser
    })
}

export const refreshToken = async (req, res) => {
    return res.json({
        status: true,
        message: "Berhasil mendapatkan token baru",
        data: await getToken(req.user)
    })
}

export const register = async (req, res) => {
    const validator = registerSchema.validate(req.body)
    const data = validator.value
    console.log(data);
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